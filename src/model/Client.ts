import * as service from '../service';

import Tacocat from './Tacocat';

class Client {
  tacocat: Tacocat;

  constructor(tacocat: Tacocat) {
    this.tacocat = tacocat;
  }
}

export default Client;
