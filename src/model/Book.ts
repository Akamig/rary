/*
** Book interface, following csv format of exported rental record.
*/

interface Book {
  userSerial: string;
  bookSerial: string;
  title: string;
  rentDate: Date;
  dueDate: Date;
}

export default Book;