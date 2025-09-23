import { type ClassValue, clsx } from 'clsx';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export type StyledProps<T = object> = T & { className?: string };

export type StyledPropsWithChildren<T = object> = PropsWithChildren<
  StyledProps & T
>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
