import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { StyledPropsWithChildren } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full sm:px-6 lg:px-8', {
  defaultVariants: {
    fullWidthOnMobile: false,
    size: 'breakpoint',
  },
  variants: {
    fullWidthOnMobile: {
      false: 'px-4',
    },
    size: {
      breakpoint:
        'sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl',
      full: '',
      narrow: 'max-w-sm',
      wide: 'max-w-7xl',
    },
  },
});

function Container({
  children,
  className,
  fullWidthOnMobile,
  size,
}: StyledPropsWithChildren & VariantProps<typeof containerVariants>) {
  return (
    <div className={containerVariants({ className, fullWidthOnMobile, size })}>
      {children}
    </div>
  );
}

export { Container, containerVariants };
