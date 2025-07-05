/* tslint:disable */

/**
 * Mock Service Worker.
 * @see https://github.com/mswjs/msw
 * - 이 파일은 수정하지 마세요.
 */

const PACKAGE_VERSION = '2.10.3';
const INTEGRITY_CHECKSUM = 'f5825c521429caf22a4dd13b66e243af';
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse');
const activeClientIds = new Set();

addEventListener('install', function () {
  self.skipWaiting();
});

addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

addEventListener('message', async function (event) {
  const clientId = Reflect.get(event.source || {}, 'id');

  if (!clientId || !self.clients) {
    return;
  }

  const client = await self.clients.get(clientId);

  if (!client) {
    return;
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  });

  switch (event.data) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      });
      break;
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: {
          packageVersion: PACKAGE_VERSION,
          checksum: INTEGRITY_CHECKSUM,
        },
      });
      break;
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId);

      sendToClient(client, {
        type: 'MOCKING_ENABLED',
        payload: {
          client: {
            id: client.id,
            frameType: client.frameType,
          },
        },
      });
      break;
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId);
      break;
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId);

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId;
      });

      // 클라이언트가 더 이상 없으면 자체 등록 해제
      if (remainingClients.length === 0) {
        self.registration.unregister();
      }

      break;
    }
  }
});

addEventListener('fetch', function (event) {
  // 네비게이션 요청은 우회
  if (event.request.mode === 'navigate') {
    return;
  }

  // DevTools를 열면 워커가 처리할 수 없는 "only-if-cached" 요청이 발생
  // 이러한 요청은 우회
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  // 활성 클라이언트가 없으면 모든 요청을 우회
  // 삭제된 후에도 요청을 처리하는 것을 방지
  // (다음 리로드까지 활성 상태로 남아있음)
  if (activeClientIds.size === 0) {
    return;
  }

  const requestId = crypto.randomUUID();
  event.respondWith(handleRequest(event, requestId));
});

/**
 * @param {FetchEvent} event
 * @param {string} requestId
 */
async function handleRequest(event, requestId) {
  const client = await resolveMainClient(event);
  const requestCloneForEvents = event.request.clone();
  const response = await getResponse(event, client, requestId);

  // "response:*" 생명주기 이벤트를 위해 응답 클론을 다시 보냄
  // MSW가 활성화되어 있고 메시지를 처리할 준비가 되었는지 확인
  // 그렇지 않으면 이 메시지가 무한정 대기함
  if (client && activeClientIds.has(client.id)) {
    const serializedRequest = await serializeRequest(requestCloneForEvents);

    // 클라이언트와 라이브러리가 모두 소비할 수 있도록 응답을 클론
    const responseClone = response.clone();

    sendToClient(
      client,
      {
        type: 'RESPONSE',
        payload: {
          isMockedResponse: IS_MOCKED_RESPONSE in response,
          request: {
            id: requestId,
            ...serializedRequest,
          },
          response: {
            type: responseClone.type,
            status: responseClone.status,
            statusText: responseClone.statusText,
            headers: Object.fromEntries(responseClone.headers.entries()),
            body: responseClone.body,
          },
        },
      },
      responseClone.body ? [serializedRequest.body, responseClone.body] : [],
    );
  }

  return response;
}

/**
 * 주어진 이벤트에 대한 메인 클라이언트를 해결합니다.
 * 요청을 발행하는 클라이언트가 반드시 워커를 등록한 클라이언트와 같지는 않습니다.
 * 응답 해결 단계에서 워커가 통신해야 하는 것은 후자입니다.
 * @param {FetchEvent} event
 * @returns {Promise<Client | undefined>}
 */
async function resolveMainClient(event) {
  const client = await self.clients.get(event.clientId);

  if (activeClientIds.has(event.clientId)) {
    return client;
  }

  if (client?.frameType === 'top-level') {
    return client;
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  });

  return allClients
    .filter((client) => {
      // 현재 보이는 클라이언트만 가져옵니다.
      return client.visibilityState === 'visible';
    })
    .find((client) => {
      // 워커를 등록한 클라이언트 세트에 기록된
      // 클라이언트 ID를 찾습니다.
      return activeClientIds.has(client.id);
    });
}

/**
 * @param {FetchEvent} event
 * @param {Client | undefined} client
 * @param {string} requestId
 * @returns {Promise<Response>}
 */
async function getResponse(event, client, requestId) {
  // 요청이 이미 사용되었을 수 있으므로 요청을 클론
  // (즉, 본문이 읽혀서 클라이언트에게 전송됨)
  const requestClone = event.request.clone();

  function passthrough() {
    // 요청 헤더를 새로운 Headers 인스턴스로 캐스팅
    // 헤더를 조작할 수 있도록 함
    const headers = new Headers(requestClone.headers);

    // 이 요청을 passthrough로 표시한 "accept" 헤더 값을 제거
    // 이는 요청 변경을 방지하고 사용자 정의 CORS 정책을 준수하도록 함
    const acceptHeader = headers.get('accept');
    if (acceptHeader) {
      const values = acceptHeader.split(',').map((value) => value.trim());
      const filteredValues = values.filter((value) => value !== 'msw/passthrough');

      if (filteredValues.length > 0) {
        headers.set('accept', filteredValues.join(', '));
      } else {
        headers.delete('accept');
      }
    }

    return fetch(requestClone, { headers });
  }

  // 클라이언트가 활성화되지 않았을 때 모킹을 우회
  if (!client) {
    return passthrough();
  }

  // 초기 페이지 로드 요청(즉, 정적 자산)을 우회
  // 활성 클라이언트 맵에 즉시/부모 클라이언트가 없다는 것은
  // MSW가 아직 "MOCK_ACTIVATE" 이벤트를 디스패치하지 않았고
  // 요청을 처리할 준비가 되지 않았음을 의미
  if (!activeClientIds.has(client.id)) {
    return passthrough();
  }

  // 요청이 가로채졌음을 클라이언트에게 알림
  const serializedRequest = await serializeRequest(event.request);
  const clientMessage = await sendToClient(
    client,
    {
      type: 'REQUEST',
      payload: {
        id: requestId,
        ...serializedRequest,
      },
    },
    [serializedRequest.body],
  );

  switch (clientMessage.type) {
    case 'MOCK_RESPONSE': {
      return respondWithMock(clientMessage.data);
    }

    case 'PASSTHROUGH': {
      return passthrough();
    }
  }

  return passthrough();
}

/**
 * @param {Client} client
 * @param {any} message
 * @param {Array<Transferable>} transferrables
 * @returns {Promise<any>}
 */
function sendToClient(client, message, transferrables = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error);
      }

      resolve(event.data);
    };

    client.postMessage(message, [channel.port2, ...transferrables.filter(Boolean)]);
  });
}

/**
 * @param {Response} response
 * @returns {Response}
 */
function respondWithMock(response) {
  // 응답 상태 코드를 0으로 설정하는 것은 no-op입니다.
  // 그러나 "Response.error()"로 응답할 때, 생성된 Response
  // 인스턴스는 상태 코드가 0으로 설정됩니다. 상태 코드 0으로
  // Response 인스턴스를 생성할 수 없으므로, 해당 사용 사례를 별도로 처리합니다.
  if (response.status === 0) {
    return Response.error();
  }

  const mockedResponse = new Response(response.body, response);

  Reflect.defineProperty(mockedResponse, IS_MOCKED_RESPONSE, {
    value: true,
    enumerable: true,
  });

  return mockedResponse;
}

/**
 * @param {Request} request
 */
async function serializeRequest(request) {
  return {
    url: request.url,
    mode: request.mode,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    cache: request.cache,
    credentials: request.credentials,
    destination: request.destination,
    integrity: request.integrity,
    redirect: request.redirect,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
    body: await request.arrayBuffer(),
    keepalive: request.keepalive,
  };
}
