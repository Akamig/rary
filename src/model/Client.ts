import * as service from '../service';

import { Cookie, Tacocat } from '.';

class Client {
  cookie: Cookie;
  tacocat: Tacocat;

  constructor(tacocat: Tacocat) {
    this.tacocat = tacocat;
  }
}

export { Client };
