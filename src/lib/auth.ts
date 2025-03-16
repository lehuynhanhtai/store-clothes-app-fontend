'use server';

import { redirect } from 'next/navigation';
import { BACKEND_URL } from './constants';
import { FormState, SignInFormSchema, SignupFormSchema } from './types';
import { createSession } from './session';

export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    name: formData.get('name'),
    account: formData.get('account'),
    password: formData.get('password'),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }
  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    redirect('/auth/signin');
  } else
    return {
      message: response.status === 409 ? 'Email already exists' : 'Server error',
    };
}

export async function signIn(state: FormState, formData: FormData): Promise<FormState> {
  const validateFields = SignInFormSchema.safeParse({
    account: formData.get('account'),
    password: formData.get('password'),
  });

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validateFields.data),
  });

  if (response.ok === true) {
    const result = await response.json();
    // TODO: Create The Session For Authenticated User.
    await createSession({
      user: {
        id: result.id,
        account: result.account,
      },
      accessToken: result.access_token,
    });

    redirect('/');
  } else {
    return {
      message: response.status === 401 ? 'Invalid credentials' : response.statusText,
    };
  }
}
