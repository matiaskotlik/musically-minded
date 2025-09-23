import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { createLoader, parseAsString } from 'nuqs/server';

import { createServerSupabase } from '@/lib/supabase/server';

const loadVerificationSearchParams = createLoader({
  code: parseAsString,
  next: parseAsString.withDefault('/'),
});

export async function GET(request: NextRequest) {
  const { code, next } = loadVerificationSearchParams(
    request.nextUrl.searchParams
  );

  if (!code) {
    console.log('Missing/invalid code');
    redirect('/auth/login');
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.log('Error verifying Code', error);
    redirect('/auth/login');
  }

  redirect(next);
}
