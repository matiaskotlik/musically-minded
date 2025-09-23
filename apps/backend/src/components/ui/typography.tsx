import { CopyIcon } from 'lucide-react';
import Link from 'next/link';
import { twc } from 'react-twc';

import { Button } from '@/components/ui/button';
import { useCopyValue } from '@/hooks/use-copy';

export const H1 = twc.h1`text-4xl font-extrabold tracking-tight text-balance lg:text-5xl`;

export const H2 = twc.h2`mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`;

export const H3 = twc.h3`mt-8 text-2xl font-semibold tracking-tight`;

export const H4 = twc.h4`mt-6 text-xl font-semibold tracking-tight`;

export const H5 = twc.h5`mt-6 text-lg font-semibold tracking-tight`;

export const H6 = twc.h6`mt-6 text-base font-semibold tracking-tight`;

export const Lead = twc.p`text-muted-foreground text-xl`;

export const P = twc.p`leading-7 [&:not(:first-child)]:mt-6`;

export const Large = twc.div`text-lg font-semibold`;

export const Small = twc.p`text-sm font-medium`;

export const Muted = twc.span`text-muted-foreground text-sm`;

export const InlineCode = twc.code`bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`;

export const MultilineCode = twc.div`bg-muted group relative flex rounded p-4`;

export const MultilineCodeContent = twc.pre`flex-1 overflow-scroll font-mono text-sm font-semibold break-words whitespace-pre-wrap`;

export function MultilineCodeCopy({ value }: { value: null | string }) {
  const [_, copy] = useCopyValue(value);
  return (
    <Button
      className='absolute top-2 right-2 opacity-0 group-hover:opacity-100'
      disabled={value === null}
      onClick={copy}
      size='icon'
      variant='outline'
    >
      <CopyIcon />
    </Button>
  );
}

export const List = twc.ul`list-disc`;

export const Quote = twc.blockquote`text-muted-foreground mt-6 border-l-2 pl-6 italic`;

export const Anchor = twc(
  Link
)`font-medium text-primary underline underline-offset-4`;
