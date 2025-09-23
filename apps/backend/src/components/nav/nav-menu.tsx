import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn, StyledProps } from '@/lib/utils';

interface NavItem {
  children: NavItemChild[];
  collapsibleTitle?: string; // defaults to title
  icon: ReactNode;
  segment: null | string;
  subtitle: string;
  title: string;
}

interface NavItemChild {
  segment: null | string;
  subtitle: string;
  title: string;
}

export default function NavMenu({
  base = '',
  className,
  navigation,
  title,
}: StyledProps<{
  base: null | string;
  navigation: NavItem[];
  title: ReactNode;
}>) {
  const resolve = ({ segment }: NavItemChild) => {
    // don't allow navigation if base url is missing (we use it for loading states)
    if (base === null) {
      return '';
    }

    // if segment is null, navigate to base url
    if (segment === null) {
      return base;
    }

    // if segment has leading slash, it's an absolute path
    if (segment.startsWith('/')) {
      return segment;
    }

    // otherwise, navigate to base url + segment
    return `${base}/${segment}`;
  };

  return (
    <>
      <NavigationMenu className={cn('hidden sm:block', className)}>
        <NavigationMenuList>
          {navigation.map((item) => (
            <NavigationMenuItem key={item.segment}>
              <NavigationMenuTrigger>
                <Link href={resolve(item)}>
                  {item.collapsibleTitle ?? item.title}
                </Link>
              </NavigationMenuTrigger>

              <NavigationMenuContent className='grid w-full grid-cols-2 gap-2'>
                <NavigationMenuLink
                  asChild
                  className='from-muted/70 to-muted/20 [&_svg]:!text-foreground flex flex-col justify-center gap-2 rounded-md bg-gradient-to-b px-4 [&_svg]:!size-6'
                  style={{
                    gridRowEnd: `span ${item.children.length || 1}`,
                  }}
                >
                  <Link href={resolve(item)}>
                    {item.icon}

                    <h4 className='text-lg font-medium'>{item.title}</h4>

                    <p className='text-muted-foreground text-sm leading-tight'>
                      {item.subtitle}
                    </p>
                  </Link>
                </NavigationMenuLink>

                {item.children.map((child, i) => (
                  <NavigationMenuLink
                    asChild
                    className='rounded-md text-sm'
                    key={i}
                  >
                    <Link href={resolve(child)}>
                      <p className='text-foreground'>{child.title}</p>

                      <p className='text-muted-foreground leading-tight'>
                        {child.subtitle}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Sheet>
        <SheetTrigger asChild className='sm:hidden'>
          <Button size='icon' variant='ghost'>
            <MenuIcon className='size-5' />
          </Button>
        </SheetTrigger>

        <SheetContent className='w-xs'>
          <SheetTitle className='mt-3 text-center'>{title}</SheetTitle>

          <Accordion className='divide-y' type='single'>
            {navigation.map((item, i) => (
              <AccordionItem key={i} value={item.title}>
                <AccordionTrigger asChild>
                  <Button
                    className='w-full justify-start py-4'
                    rounded='none'
                    variant='ghost'
                  >
                    {item.collapsibleTitle ?? item.title}

                    <AccordionIcon className='ml-auto' />
                  </Button>
                </AccordionTrigger>

                <AccordionContent>
                  <Button
                    asChild
                    className='w-full justify-start py-3 pl-8'
                    rounded='none'
                    variant='ghost'
                  >
                    <Link href={resolve(item)}>{item.title}</Link>
                  </Button>

                  {item.children.map((child, i) => (
                    <Button
                      asChild
                      className='w-full justify-start py-3 pl-8'
                      key={i}
                      rounded='none'
                      variant='ghost'
                    >
                      <Link href={resolve(child)}>{child.title}</Link>
                    </Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SheetContent>
      </Sheet>
    </>
  );
}
