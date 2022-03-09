import fetch from "node-fetch";
import iconv from "iconv-lite";

import { Cookie, Tacocat, Book } from "../model";

async function getBookList(cookie: Cookie, tacocat: Tacocat) {
  const bookList = fetch(`${tacocat.LIBURL}/MyLibrary/fileexport?year=ALL`, {
    headers: {
      Cookie: cookie.ASPNETSessionId,
    },
    redirect: "manual",
  }).then(async (res) => {
    const csv = iconv.decode(await res.buffer(), "euc-kr");
    const [header, ...rows] = csv.replace(/"/g, "").split("\r\n");
    return rows.map((rowStr) => {
      const [userSerial, bookSerial, title, rentDate, dueDate, returnDate] =
        rowStr.split(",");
      const book: Book = {
        userSerial,
        bookSerial,
        title,
        rentDate,
        dueDate,
        returnDate,
      };
      return book;
    });
  });
  return bookList;
}

export { getBookList };
