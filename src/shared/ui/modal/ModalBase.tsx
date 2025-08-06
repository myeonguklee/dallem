'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/cn';
import { VariantProps } from 'class-variance-authority';
import { Button } from '../button';
import { XIcon } from '../icon';
import { modalVariants } from './variants';

interface ModalProps extends VariantProps<typeof modalVariants> {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  isOverlay?: boolean;
  showCloseButton?: boolean;
}

export const ModalBase = ({
  children,
  className,
  isOpen,
  onClose,
  isOverlay = true,
  variant = 'default',
  showCloseButton = true,
}: ModalProps) => {
  // 애니에이션 관리하기
  const [isVisible, setIsVisible] = useState(false);
  // 모달 포탈로 열기 : 하이브리드 오류 방지
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll Lock 전용 + 스크롤바 상태 유지
  useEffect(() => {
    if (isOpen && isOverlay) {
      const hasScrollbar =
        document.documentElement.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      if (hasScrollbar && scrollbarWidth > 0) {
        // 스크롤바가 있었던 경우: 스크롤바 공간 유지
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollbarWidth}px`;
        // fixed 헤더 내부 컨테이너 조정
        const headerContainer = document.querySelector('header > div') as HTMLElement;
        if (headerContainer) {
          headerContainer.style.marginRight = `${scrollbarWidth}px`;
        }
      } else {
        // 스크롤바가 없었던 경우: 그냥 스크롤 락만
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.marginRight = '';
      // 헤더 내부 컨테이너 마진도 제거
      const headerContainer = document.querySelector('header > div') as HTMLElement;
      if (headerContainer) {
        headerContainer.style.marginRight = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.marginRight = '';
      const headerContainer = document.querySelector('header > div') as HTMLElement;
      if (headerContainer) {
        headerContainer.style.marginRight = '';
      }
    };
  }, [isOpen, isOverlay]);

  useEffect(() => {
    if (!isOpen || !onClose) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!mounted || !isVisible) return null;

  const modalContent = (
    <div
      role="dialog"
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center"
    >
      {isOverlay && (
        <div
          className={cn(
            'absolute inset-0 bg-black transition-opacity duration-300',
            isVisible ? 'opacity-60' : 'opacity-0',
          )}
          onClick={onClose}
        />
      )}
      <div
        className={cn(
          modalVariants({ variant }),
          'transition-all duration-300',
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0',
          className,
        )}
      >
        {showCloseButton && (
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="close"
            className="absolute top-4 right-4 text-2xl text-gray-400 transition-all duration-300 hover:rotate-90 hover:text-gray-600"
          >
            <XIcon />
          </Button>
        )}
        <div className="flex max-h-[90vh] flex-col">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
