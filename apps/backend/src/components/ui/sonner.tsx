'use client';

import { CSSProperties, ReactNode } from 'react';
import { ExternalToast, Toaster as Sonner, ToasterProps } from 'sonner';

export type ToastOptions = ExternalToast & {
  title: (() => ReactNode) | ReactNode;
};

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className='toaster group'
      richColors
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-border': 'var(--border)',
          '--normal-text': 'var(--popover-foreground)',
        } as CSSProperties
      }
      theme='light'
      {...props}
    />
  );
}

export { Toaster };
