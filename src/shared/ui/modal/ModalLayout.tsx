'use client';

import { Button } from '../button';
import { ModalBase } from './ModalBase';

const Header = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-4 text-left break-words">{children}</h3>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 overflow-y-auto">{children}</div>
);

interface ModalFooterProps {
  children?: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  isPrimaryDisabled?: boolean;
  isSecondaryDisabled?: boolean;
}

const Footer = ({
  children,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  isPrimaryDisabled,
  isSecondaryDisabled,
}: ModalFooterProps) => (
  <div className="mt-6 flex items-center justify-between gap-2">
    {children}
    {secondaryButtonText && (
      <Button
        variant="outline"
        onClick={onSecondaryClick}
        disabled={isSecondaryDisabled}
        className="w-full"
      >
        {secondaryButtonText}
      </Button>
    )}
    {primaryButtonText && (
      <Button
        variant="primary"
        onClick={onPrimaryClick}
        disabled={isPrimaryDisabled}
        className="w-full"
      >
        {primaryButtonText}
      </Button>
    )}
  </div>
);

export const Modal = {
  Root: ModalBase,
  Header,
  Body,
  Footer,
};
