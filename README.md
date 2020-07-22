# rary

API library for my school library system.

I made this library to automate extending book rental due. because their notify system always sends due date message day earlier and I always forgot, so go to school takes about an hour, just to returning and re-rent books. what a hassle.

Why the name 'rary'? because it's a library for library, so I was about to name it library-lib, but library-lib is rary!
...sorry about the bad joke.

Sadly, some part of this library was made intentionally obscure, because first, I didn't want to specify my school publically, and second, middle of the development I figured out this library could be misused to automating course registration, which I never want and as license says I don't want to get sued either. So, obscurity.

## ~~Build~~ Install

```bash
git clone https://github.com/Akamig/rary
cd ./rary

yarn install
yarn tsc
cd /build
```

## What can I do with this?

If you are in the same school as mine or using the same system, this library is for you!  
Anyway, you can do these.

- SSO Login (actually it's system-wide)
- Fetch Rented Book Data.
- **Extend Book Rental Due**

Well, that's all.  

Of course there're many other functions in our library system. But I'm pretty sure those are easier on a browser, not console. And I don't even need 'em. so there's that.

# Special Thanks

Especially thanks to [@ParkSB](https://github.com/ParkSB), for designing [the-camp-lib](https://github.com/ParkSB/the-camp-lib) which helped me grasp a basic concept of API Client, typescript usage, and I heavily referenced(i.e. shamelessly copied ) it.

Special Thanks to [@simnalamburt](https://github.com/simnalamburt), [@xnuk](https://github.com/xnuk), [@_danuel_](https://twitter.com/_danuel_).