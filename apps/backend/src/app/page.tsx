import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { P } from '@/components/ui/typography';
import { createServerSupabase } from '@/lib/supabase/server';

export default async function IndexPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Section>
        {user ? (
          <Container className='space-y-2'>
            <P>Logged in as: {user.email}</P>
            <Button asChild>
              <Link href='/auth/logout?next=/'>Log out</Link>
            </Button>
          </Container>
        ) : (
          <Container className='space-y-2'>
            <P>Logged out</P>
            <Button asChild>
              <Link href='/auth/login?next=/'>Log in</Link>
            </Button>
          </Container>
        )}
      </Section>
      <Section>
        <Container className='space-y-2'>
          <Button asChild>
            <Link href='/api/rest/swagger'>Go to API Client</Link>
          </Button>
        </Container>
      </Section>
    </>
  );
}
