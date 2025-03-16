'use server';

import { BACKEND_URL } from './constants';
import { getSession } from './session';

export const getProfile = async () => {
  const session = await getSession();
  const response = await fetch(`${BACKEND_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const result = await response.json();
  return result;
};
