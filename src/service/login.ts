import fetch from 'node-fetch';
import { Cookie, Tacocat } from '../model';

async function login(id: string, password: string, tacocat: Tacocat) {
  const LoginForm = new URLSearchParams({
    l_token: tacocat.L_TOKEN,
    user_id: id,
    user_password: password,
  });

  const LoginRes = await fetch(`${tacocat.SSOURL}Login.do`, {
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
    console.log('Fetching Redirection URL Success.');
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

  console.log(`Session Key Acquired: "${cookie.ASPNETSessionId}"`);

  await fetch(`${tacocat.LIBURL}${tacocat.SSOLOGON}`, {
    redirect: 'manual',
    headers: {
      Cookie: cookie.ASPNETSessionId,
    },
  }).then((response) => {
    if (response.ok) {
      console.log('SSO Login Success.');
    } else {
      throw new Error('SSO Login Unsuccessful.');
    }
  });

  return cookie;
}

export { login };
