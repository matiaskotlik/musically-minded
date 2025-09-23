import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { createLoader, parseAsString, parseAsStringLiteral } from 'nuqs/server';

import { createServerSupabase } from '@/lib/supabase/server';

const loadVerificationSearchParams = createLoader({
  next: parseAsString.withDefault('/'),
  token_hash: parseAsString,
  type: parseAsStringLiteral(['invite', 'recovery', 'email_change', 'email']),
});

export async function GET(request: NextRequest) {
  const { next, token_hash, type } = loadVerificationSearchParams(
    request.nextUrl.searchParams
  );

  if (!type || !token_hash) {
    console.log('Missing/invalid type or token_hash');
    redirect('/auth/login');
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.verifyOtp({ token_hash, type });
  if (error) {
    console.log('Error verifying OTP', error);
    redirect('/auth/login');
  }

  revalidatePath('/', 'layout');
  redirect(next);
}
