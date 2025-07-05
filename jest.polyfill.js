// Node.js util에서 TextEncoder, TextDecoder polyfill
import fetch from 'node-fetch';
import { TextDecoder, TextEncoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Jest 환경에서 fetch polyfill
if (typeof global.fetch === 'undefined') {
  global.fetch = fetch;
}

// Jest 환경에서 필요한 Web API polyfill

global.Response =
  global.Response ||
  class Response {
    constructor(body, init = {}) {
      this.body = body;
      this.status = init.status || 200;
      this.statusText = init.statusText || '';
      this.headers = new Map(Object.entries(init.headers || {}));
    }

    json() {
      if (typeof this.body === 'string') {
        return Promise.resolve(JSON.parse(this.body));
      }
      return Promise.resolve(this.body);
    }

    text() {
      return Promise.resolve(JSON.stringify(this.body));
    }

    clone() {
      return new Response(this.body, {
        status: this.status,
        statusText: this.statusText,
        headers: Object.fromEntries(this.headers),
      });
    }
  };

global.Request =
  global.Request ||
  class Request {
    constructor(url, init = {}) {
      this.url = url;
      this.method = init.method || 'GET';
      this.headers = new Map(Object.entries(init.headers || {}));
      this.body = init.body;
    }

    json() {
      return Promise.resolve(this.body);
    }

    text() {
      return Promise.resolve(JSON.stringify(this.body));
    }

    clone() {
      return new Request(this.url, {
        method: this.method,
        headers: Object.fromEntries(this.headers),
        body: this.body,
      });
    }
  };

global.Headers =
  global.Headers ||
  class Headers {
    constructor(init = {}) {
      this.map = new Map(Object.entries(init));
    }

    get(name) {
      return this.map.get(name.toLowerCase());
    }

    set(name, value) {
      this.map.set(name.toLowerCase(), value);
    }

    has(name) {
      return this.map.has(name.toLowerCase());
    }
  };

// TransformStream polyfill
global.TransformStream =
  global.TransformStream ||
  class TransformStream {
    constructor() {
      this.readable = new ReadableStream();
      this.writable = new WritableStream();
    }
  };

// ReadableStream polyfill
global.ReadableStream =
  global.ReadableStream ||
  class ReadableStream {
    constructor() {
      this.locked = false;
    }
  };

// WritableStream polyfill
global.WritableStream =
  global.WritableStream ||
  class WritableStream {
    constructor() {
      this.locked = false;
    }
  };

// BroadcastChannel polyfill
global.BroadcastChannel =
  global.BroadcastChannel ||
  class BroadcastChannel {
    constructor(name) {
      this.name = name;
    }

    postMessage() {}
    close() {}
  };
