'use server';

import { Provider } from '@supabase/supabase-js';
import { actionError, createAction } from 'next-extra/action';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createServerSupabase } from '@/lib/supabase/server';

export interface AuthActionArgs {
  afterAuthPath: string;
}

export type AuthActionParams = AuthActionArgs & AuthFormData;

export type AuthActionResponse =
  | {
      data: null;
      error: string;
    }
  | {
      data: {
        message: string;
      };
      error: null;
    };

export interface AuthFormData {
  confirmPassword: string;
  email: string;
  password: string;
}

export const signUpAction = createAction(
  async ({ afterAuthPath, email, password }: AuthActionParams) => {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.signUp({
      email,
      options: {
        emailRedirectTo: afterAuthPath,
      },
      password,
    });

    if (error) {
      actionError(error.name, error.message);
    }

    return {
      message:
        'Check your email for a verification link to complete your registration.',
    };
  }
);

export const loginAction = createAction(
  async ({ afterAuthPath, email, password }: AuthActionParams) => {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      actionError(error.name, error.message);
    }

    revalidatePath('/', 'layout');
    redirect(afterAuthPath);
  }
);

export const forgotPasswordAction = createAction(
  async ({ email }: AuthActionParams) => {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: '/auth/change-password',
    });

    if (error) {
      actionError(error.name, error.message);
    }

    return {
      message:
        'Check your email for a link to reset your password. If you do not receive an email, please check your spam folder.',
    };
  }
);

export const changePasswordAction = createAction(
  async ({ afterAuthPath, password }: AuthActionParams) => {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      actionError(error.name, error.message);
    }

    redirect(afterAuthPath);
  }
);

export const socialLoginAction = createAction(
  async ({ provider }: { provider: Provider }) => {
    const supabase = await createServerSupabase();

    const {
      data: { url },
      error,
    } = await supabase.auth.signInWithOAuth({
      options: {
        redirectTo: '/auth/callback',
      },
      provider,
    });

    if (error) {
      actionError(error.name, error.message);
    }

    if (url) {
      redirect(url);
    }
  }
);
