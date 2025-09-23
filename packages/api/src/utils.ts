import { ORPCError, ValidationError } from '@orpc/server';
import z from 'zod';

export const transformZodError = (error: unknown) => {
  if (
    error instanceof ORPCError &&
    error.code === 'BAD_REQUEST' &&
    error.cause instanceof ValidationError
  ) {
    // If you only use Zod you can safely cast to ZodIssue[]
    const zodError = new z.ZodError(error.cause.issues as z.core.$ZodIssue[]);
    throw new ORPCError('INPUT_VALIDATION_FAILED', {
      cause: error.cause,
      data: z.flattenError(zodError),
      message: z.prettifyError(zodError),
      status: 422,
    });
  }

  if (
    error instanceof ORPCError &&
    error.code === 'INTERNAL_SERVER_ERROR' &&
    error.cause instanceof ValidationError
  ) {
    throw new ORPCError('OUTPUT_VALIDATION_FAILED', {
      cause: error.cause,
    });
  }
};
