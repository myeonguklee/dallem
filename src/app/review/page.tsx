'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { BasicModal } from '@/shared/ui/modal/BasicModal';
import { Popup } from '@/shared/ui/modal/Popup';

// 실제 사용 예시
const ModalUsageExample = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 모달 열림/닫힘 상태
  const [name, setName] = useState(''); // 이름 상태
  const [email, setEmail] = useState(''); // 이메일 상태

  const handleDelete = () => {
    console.log('아이템 삭제 로직 실행!');
    setPopupOpen(false); // 작업 완료 후 팝업 닫기
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제출됨:', { name, email });
    setIsOpen(false); // 제출 후 모달 닫기
    // 👉 여기에 API 전송 로직 추가 가능
  };

  return (
    <>
      <Button onClick={() => setPopupOpen(true)}>아이템 삭제</Button>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleDelete}
        message="로그인이 필요한 서비스 입니다. "
        primaryButtonText="로그인"
      />

      <Button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        리뷰 작성
      </Button>

      <BasicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="리뷰 작성"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-2"
        >
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2"
            required
          />
          <div className="flex gap-4">
            <Button
              type="button"
              variant={'outline'}
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="w-full bg-blue-500 py-2 text-white"
            >
              제출
            </Button>
          </div>
        </form>
      </BasicModal>
    </>
  );
};

export default ModalUsageExample;
