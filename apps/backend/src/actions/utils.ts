import { SafeReturn } from 'next-extra';

export const unwrapAction = <T>({ data, error }: SafeReturn<T>) => {
  if (error) {
    throw error;
  }
  return data;
};
