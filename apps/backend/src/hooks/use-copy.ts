'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';

import { ToastOptions } from '@/components/ui/sonner';

interface CopyProps {
  delay?: number;
  failureToast?: null | ToastOptions;
  successToast?: null | ToastOptions;
}

type Value = null | string | undefined;

export const useCopy = ({
  delay = 2000,
  failureToast = {
    title: 'Failed to copy',
  },
  successToast = {
    title: 'Copied!',
  },
}: CopyProps = {}): [boolean, (value?: Value) => Promise<boolean>] => {
  const [copied, setCopied] = useState(false);
  const [_, setCopiedText] = useCopyToClipboard();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const copy = async (value: Value) => {
    if (!value) {
      return false;
    }

    const success = await setCopiedText(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCopied(success);

    if (success) {
      if (successToast) {
        const { title, ...opts } = successToast;
        toast(title, opts);
      }

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        setCopied(false);
      }, delay);
    } else {
      if (failureToast) {
        const { title, ...opts } = failureToast;
        toast.error(title, opts);
      }
    }

    return success;
  };

  return [copied, copy];
};

export const useCopyValue = (
  value: (() => Value) | Value,
  options?: CopyProps
): [boolean, () => Promise<boolean>] => {
  const [copied, copy] = useCopy(options);
  return [copied, () => copy(typeof value === 'function' ? value() : value)];
};
