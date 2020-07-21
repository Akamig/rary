import fetch from 'node-fetch';

import { Book, Cookie, Tacocat } from '../model';

async function dueRenew(book: Book, cookie: Cookie, tacocat: Tacocat) {
  fetch(`${tacocat.LIBURL}/MyLibrary/Renewal/${book.bookSerial}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: cookie.ASPNETSessionId,
    },
    body: 'confirmButton1=',
    redirect: 'manual',
  }).then((response) => {
    if (response.headers.get('location')?.includes('/MyLibrary')) {
      console.log(`Renew Successful for ${book.title}`);
    }
    // TODO: Book data modifying (extend due date of Book object, etc.)
  });
}

export { dueRenew };
