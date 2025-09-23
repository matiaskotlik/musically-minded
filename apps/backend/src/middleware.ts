import { type NextRequest } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next (Next.js static files)
     * - api (api routes)
     * - favicon.ico (favicon file)
     * - alerts (sentry)
     * - top-level static image files
     */
    '/((?!_next|api|favicon.ico|alerts|.*\\.(?:svg|png|jpg|jpeg|gif|webp)(?:\\?|\\/|$)).*)',
  ],
};
