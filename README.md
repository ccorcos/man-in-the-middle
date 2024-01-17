# Man in the Middle (MITM) Proxy

A simple tool for debugging and reverse engineering by proxying a server and logging all requests and responses.

```sh
git clone git@github.com:ccorcos/man-in-the-middle.git
cd man-in-the-middle
npm i
chmod +x midm


# ./midm <domain> <port>
./midm http://weather.opensprinkler.com 3344
```
