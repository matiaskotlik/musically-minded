import { ORPCError, os } from '@orpc/server';
import { Database } from '@repo/supabase/database.types';
import { SupabaseClient } from '@supabase/supabase-js';
import z from 'zod';

export async function createRPCContext({
  supabase,
}: {
  supabase: SupabaseClient<Database>;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return {
    user,
  };
}

const o = os.$context<Awaited<ReturnType<typeof createRPCContext>>>();

const timingMiddleware = o.middleware(async ({ next, path }) => {
  const start = Date.now();

  try {
    return await next();
  } finally {
    console.log(`[oRPC] ${path} took ${Date.now() - start}ms to execute`);
  }
});

export const publicProcedure = o.use(timingMiddleware);

export const protectedProcedure = publicProcedure.use(({ context, next }) => {
  const { user } = context;
  if (!user) {
    throw new ORPCError('UNAUTHORIZED');
  }

  return next({
    context: { ...context, user },
  });
});

export const router = {
  me: publicProcedure
    .output(
      z
        .object({
          email: z.string().optional(),
          id: z.string(),
        })
        .nullable()
    )
    .handler(({ context: { user } }) => user),
  ping: publicProcedure
    .input(
      z.object({
        pong: z.string().default('pong'),
      })
    )
    .output(z.string())
    .handler(({ input: { pong } }) => pong),
};
