import type { NextRequest } from 'next/server';

import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { onError } from '@orpc/server';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { createRPCContext, router } from '@repo/api';
import { transformZodError } from '@repo/api/utils';

import { createServerSupabase } from '@/lib/supabase/server';

const handler = new OpenAPIHandler(router, {
  clientInterceptors: [onError(transformZodError)],
  plugins: [
    new OpenAPIReferencePlugin({
      docsPath: '/swagger',
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
  ],
});

async function handleRequest(request: NextRequest) {
  const supabase = await createServerSupabase();
  const { response } = await handler.handle(request, {
    context: await createRPCContext({ supabase }),
    prefix: '/api/rest',
  });

  return response ?? new Response('Not found', { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
