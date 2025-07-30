'use client';

import { Button } from '../button';
import { ModalBase } from './ModalBase';

const Header = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-left break-words">{children}</h3>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 overflow-y-auto">{children}</div>
);

interface ModalFooterProps {
  children?: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const Footer = ({
  children,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: ModalFooterProps) => (
  <div className="mt-4 flex items-center justify-between gap-2">
    {children}
    {secondaryButtonText && (
      <Button
        variant="outline"
        onClick={onSecondaryClick}
        className="w-full"
      >
        {secondaryButtonText}
      </Button>
    )}
    {primaryButtonText && (
      <Button
        variant="primary"
        onClick={onPrimaryClick}
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
