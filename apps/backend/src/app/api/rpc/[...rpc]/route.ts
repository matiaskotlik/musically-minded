import type { NextRequest } from 'next/server';

import { onError } from '@orpc/server';
import { RPCHandler } from '@orpc/server/fetch';
import { createRPCContext, router } from '@repo/api';
import { transformZodError } from '@repo/api/utils';

import { createServerSupabase } from '@/lib/supabase/server';

const handler = new RPCHandler(router, {
  clientInterceptors: [onError(transformZodError)],
});

async function handleRequest(request: NextRequest) {
  const supabase = await createServerSupabase();
  const { response } = await handler.handle(request, {
    context: await createRPCContext({ supabase }),
    prefix: '/api/rpc',
  });

  return response ?? new Response('Not found', { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
