/*
 ** Environment Variables interface, named after this tweet.
 ** https://twitter.com/_Akamig/status/1283437475663212545
 */

class Tacocat {
  public SSOURL: string;
  public LIBURL: string;
  public SSOLOGON: string;
  public L_TOKEN: string;

  constructor(
    SSOURL: string,
    LIBURL: string,
    SSOLOGON: string,
    L_TOKEN: string
  ) {
    this.SSOURL = SSOURL;
    this.LIBURL = LIBURL;
    this.SSOLOGON = SSOLOGON;
    this.L_TOKEN = L_TOKEN;
  }
}

export { Tacocat };
