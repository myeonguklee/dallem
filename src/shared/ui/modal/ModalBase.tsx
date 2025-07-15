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

  // Scroll Lock 전용
  useEffect(() => {
    if (isOpen && isOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isOverlay]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!mounted || !isVisible) return null;

  const modalContent = (
    <div
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center"
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
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0',
          className,
        )}
      >
        {showCloseButton && (
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="close"
            className="absolute top-4 right-4 text-2xl text-gray-400 transition-all duration-200 hover:rotate-90 hover:text-gray-600"
          >
            <XIcon />
          </Button>
        )}
        <div className="flex max-h-[85vh] flex-col">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
