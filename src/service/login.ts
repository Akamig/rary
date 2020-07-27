import fetch from 'node-fetch';
import { Cookie, Tacocat } from '../model';

async function login(id: string, password: string, tacocat: Tacocat) {
  const loginForm = new URLSearchParams({
    l_token: tacocat.L_TOKEN,
    user_id: id,
    user_password: password,
  });

  const loginRes = await fetch(`${tacocat.SSOURL}Login.do`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: loginForm,
    redirect: 'manual',
  }).then(async (res) => {
    if (res.status !== 302) {
      throw new Error(`Response: ${res.status}, Login redirection failed.`);
    }
    if (!res.headers.get('location')) {
      throw new Error('Login failed, No redirection URL found.');
    }
    const redirectUrl = res.headers.get('location')!;
    if (redirectUrl.includes('portal')) {
      throw new Error('Login failed. Your account seems locked.');
    }
    console.log('Fetching Redirection URL Success.');
    return redirectUrl;
  });

  const cookie: Cookie = await fetch(loginRes, {
    redirect: 'manual',
  }).then(async (res) => {
    if (!res.headers.get('set-cookie')!.includes('ASP.NET_SessionId=')) {
      throw new Error('No ASP Session ID in cookie.');
    }

    const cookies = res.headers.get('set-cookie')!;
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
  }).then(async (res) => {
    if (res.ok) {
      console.log('SSO Login Success.');
    } else {
      throw new Error('SSO Login Unsuccessful.');
    }
  });

  return cookie;
}

export { login };
