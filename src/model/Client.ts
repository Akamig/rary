import * as service from '../service';

import { Cookie, Tacocat, Book } from '.';

class Client {
  cookie: Cookie;
  tacocat: Tacocat;

  constructor(tacocat: Tacocat) {
    this.tacocat = tacocat;
  }

  async login(id: string, password: string) {
    this.cookie = await service.login(id, password, this.tacocat);
  }

  async dueRenew(book: Book) {
    service.dueRenew(book, this.cookie, this.tacocat);
  }
}

export { Client };
