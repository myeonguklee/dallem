'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal/Modal';

// 실제 사용 예시
const ModalUsageExample = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [formState, setFormState] = useState({
    title: '',
    category: '',
    content: '',
  });

  const isFormValid = formState.title && formState.category && formState.content;

  const [input, setInput] = useState(false);

  const handleSubmit = () => {
    console.log('폼 제출됨:', formState);
    setIsFormOpen(false);
    setFormState({ title: '', category: '', content: '' });
    alert('저장되었습니다!');
  };

  const handleChange =
    (field: 'title' | 'category' | 'content') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleFormSubmit = () => {
    alert('제출하였습니다.');
    setInput(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">모달 사용 예시</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 1. 확인/취소 팝업 모달 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">확인/취소 팝업</h2>
            <p className="mb-4 text-gray-600">
              삭제, 확인 등의 간단한 액션을 위한 작은 팝업입니다.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsConfirmOpen(true)}
            >
              게시물 삭제
            </Button>
          </div>

          {/* 2. 폼 모달 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">폼 모달</h2>
            <p className="mb-4 text-gray-600">입력 폼이나 상세한 내용을 담는 큰 모달입니다.</p>
            <Button onClick={() => setIsFormOpen(true)}>새 게시물 작성</Button>
          </div>

          {/* 3. 일반 정보 모달 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">일반 모달</h2>
            <p className="mb-4 text-gray-600">일반적인 정보나 내용을 보여주는 기본 모달입니다.</p>
            <Button onClick={() => setIsInfoOpen(true)}>정보 보기</Button>
          </div>
        </div>

        {/* 확인/취소 팝업 모달 */}
        <Modal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          variant="dialog"
        >
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">게시물 삭제</h3>
            <p className="text-gray-600">
              정말로 이 게시물을 삭제하시겠습니까?
              <br />
              삭제된 게시물은 복구할 수 없습니다.
            </p>
          </div>
        </Modal>

        {/* 폼 모달 */}
        <Modal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onConfirm={handleSubmit}
          variant="form"
          secondaryButtonText="취소"
          primaryButtonText="등록"
          disabledPrimary={!isFormValid} // <- 여기에 상태 연결!
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">새 게시물 작성</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">제목</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="게시물 제목을 입력하세요"
                  value={formState.title}
                  onChange={handleChange('title')}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">카테고리</label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formState.category}
                  onChange={handleChange('category')}
                >
                  <option value="">카테고리를 선택하세요</option>
                  <option value="공지사항">공지사항</option>
                  <option value="자유게시판">자유게시판</option>
                  <option value="질문&답변">질문&답변</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">내용</label>
                <textarea
                  className="h-32 w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="게시물 내용을 입력하세요"
                  value={formState.content}
                  onChange={handleChange('content')}
                />
              </div>
            </div>
          </div>
        </Modal>

        {/* 일반 정보 모달 */}
        <Modal
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
          onConfirm={handleFormSubmit}
          disabledSecondary={input}
          variant="dialog"
        >
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">서비스 정보</h3>
            <div className="space-y-3 text-left">
              <p className="text-gray-600">
                <strong>서비스명:</strong> 게시판 시스템 v2.0
              </p>
              <p className="text-gray-600">
                <strong>개발자:</strong> 개발팀
              </p>
              <p className="text-gray-600">
                <strong>업데이트:</strong> 2024.01.15
              </p>
              <p className="text-gray-600">
                <strong>주요 기능:</strong>
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1 text-gray-600">
                <li>게시물 작성/수정/삭제</li>
                <li>댓글 시스템</li>
                <li>파일 첨부 기능</li>
                <li>검색 및 필터링</li>
              </ul>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ModalUsageExample;
