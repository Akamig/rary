import fetch from 'node-fetch';

export default async function login(id: string, password: string) {
  const LoginForm = new URLSearchParams({
    user_id: id,
    user_password: password,
  });

  const LoginRes = await fetch(`${ssoPrefix}${url}Login.do`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'manual',
  }).then(async (response) => {
    let redirectUrl = response.headers.get('location');
    if (response.status !== 302) {
      throw new Error(`Response: ${response.status}, Login redirection failed.`);
    }
    if (redirectUrl === null) {
      throw new Error('Login failed, No redirection URL found.');
    }
    if (redirectUrl?.includes('portal')) {
      throw new Error('Login failed. Your account seems locked.');
    }
    return redirectUrl;
  });

}
