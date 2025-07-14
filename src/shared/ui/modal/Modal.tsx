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
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onConfirm?: () => void;
  disabledPrimary?: boolean;
  disabledSecondary?: boolean;
}

export const Modal = ({
  children,
  className,
  isOpen,
  onClose,
  onConfirm,
  isOverlay = true,
  variant = 'default',
  secondaryButtonText,
  primaryButtonText,
  disabledPrimary = false,
  disabledSecondary = false,
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
      // 모달 배경 스크롤 금지
      document.body.style.overflow = 'hidden';
    } else {
      // 애니메이션 끝난 후 닫히기
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {isOverlay && (
        <div
          className={cn(
            'absolute inset-0 bg-black transition-opacity duration-300',
            isOpen ? 'opacity-60' : 'opacity-0',
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
        <Button
          variant="ghost"
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 transition-all duration-200 hover:rotate-90 hover:text-gray-600"
        >
          <XIcon />
        </Button>
        <div className="text-center">{children}</div>
        <div className="mt-6 flex justify-center gap-3">
          {secondaryButtonText && (
            <Button
              variant="outline"
              onClick={onClose}
              disabled={disabledSecondary}
              className="w-full"
            >
              {secondaryButtonText}
            </Button>
          )}
          {primaryButtonText && (
            <Button
              variant="primary"
              onClick={onConfirm}
              disabled={disabledPrimary}
              className="w-full"
            >
              {primaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
