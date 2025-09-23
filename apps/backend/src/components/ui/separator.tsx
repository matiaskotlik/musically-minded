'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn, StyledPropsWithChildren } from '@/lib/utils';

function Separator({
  className,
  decorative = true,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className
      )}
      data-slot='separator-root'
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}

function SeparatorLabel({ children, className }: StyledPropsWithChildren) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Separator className='flex-1' />

      <span className='text-muted-foreground'>{children}</span>

      <Separator className='flex-1' />
    </div>
  );
}

export { Separator, SeparatorLabel };
