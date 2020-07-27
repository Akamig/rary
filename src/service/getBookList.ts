import fetch from 'node-fetch';
import iconv from 'iconv-lite';

import { Cookie, Tacocat, Book } from '../model';

async function getBookList(cookie: Cookie, tacocat: Tacocat) {
  const bookList = await fetch(`${tacocat.LIBURL}/MyLibrary/fileexport?year=ALL`, {
    headers: {
      Cookie: cookie.ASPNETSessionId,
    },
    redirect: 'manual',
  }).then(async (res) => {
    const csv = iconv.decode(await res.buffer(), 'euc-kr');
    const [header, ...rows] = csv.replace(/"/g, '').split('\r\n');
    return rows.map((rowStr) => {
      const entry = rowStr.split(',');
      const book: Book = {
        userSerial: entry[0],
        bookSerial: entry[1],
        title: entry[2],
        rentDate: entry[3],
        dueDate: entry[4],
        returnDate: entry[5],
      };
      return book;
    });
  });
  return bookList;
}

export { getBookList };
