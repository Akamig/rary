import fetch from 'node-fetch';
import iconv from 'iconv-lite';

import { Cookie, Tacocat } from '../model';

async function getBookList(cookie: Cookie, tacocat: Tacocat) {
  await fetch(`${tacocat.LIBURL}/MyLibrary/fileexport?year=ALL`, {
    headers: {
      Cookie: cookie.ASPNETSessionId,
    },
    redirect: 'manual'
  }).then(async (resp) => {
    const body = await resp.buffer();
    console.log(iconv.decode(body, 'euc-kr'));
  });
}

export { getBookList };
