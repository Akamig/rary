import fetch from 'node-fetch';
import { Cookie } from '../model/Cookie';

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
    body: LoginForm,
    redirect: 'manual',
  }).then(async (response) => {
    if (response.status !== 302) {
      throw new Error(`Response: ${response.status}, Login redirection failed.`);
    }
    if (!response.headers.get('location')) {
      throw new Error('Login failed, No redirection URL found.');
    }
    const redirectUrl = response.headers.get('location')!;
    if (redirectUrl.includes('portal')) {
      throw new Error('Login failed. Your account seems locked.');
    }
    return redirectUrl;
  });

  const cookie: Cookie = await fetch(LoginRes, {
    redirect: 'manual',
  }).then(async (response) => {
    if (!response.headers.get('set-cookie')!.includes('ASP.NET_SessionId=')) {
      throw new Error('No ASP Session ID in cookie.');
    }

    const cookies = response.headers.get('set-cookie')!;
    return {
      ASPNETSessionId: cookies.match(/ASP\.NET_SessionId=.*?;/)!.toString(),
    };
  });

  console.log(cookie.ASPNETSessionId);

  fetch(`${libPrefix}${url}${ssoLogonSuffix}`, {
    redirect: 'manual',
    headers: {
      Cookie: cookie.ASPNETSessionId,
    },
  });

  return cookie;
}
