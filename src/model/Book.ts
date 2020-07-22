/*
** Book interface, following csv format of exported rental record.
*/

interface Book {
  userSerial: string;
  bookSerial: string;
  title: string;
  rentDate: string;
  dueDate: string;
  returnDate: string;
}

export { Book };