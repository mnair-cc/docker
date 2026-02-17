const BASE_API_URL = 'http://localhost:3001';

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch(`${BASE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    console.error('Failed to logout');
  }

  return res.json();
};

export const getCurrentUser = async () => {
  const res = await fetch(`${BASE_API_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    console.error('Failed to get current user');
    return null;
  }

  const user = await res.json();
  return user;
};
