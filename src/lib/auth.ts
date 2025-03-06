'use server';

import { redirect } from 'next/navigation';
import { BACKEND_URL } from './constants';
import { FormState, SignupFormSchema } from './types';

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
