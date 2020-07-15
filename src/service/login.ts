import fetch from 'node-fetch';

export default async function login(id: string, password: string) {
  const LoginForm = new URLSearchParams({
    user_id: id,
    user_password: password,
  });
}
