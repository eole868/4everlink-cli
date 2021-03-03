<h3 align="center">A command line tool for upload file to IPFS Cluster use the IPFS Cluster HTTP API.</h3>

[![NPM Version](https://img.shields.io/npm/v/@4everlink/cli)](https://www.npmjs.org/package/@4everlink/cli)
[![Install Size](https://packagephobia.now.sh/badge?p=@4everlink/cli)](https://packagephobia.now.sh/result?p=@4everlink/cli)
![License](https://img.shields.io/npm/l/@4everlink/cli)


Read this in other languages: English | [简体中文](./README_ZH-CN.md) 
## install

```
npm install -g @4everlink/cli
```

## Command

```
$ 4everlink --help
Usage: 4everlink [options] <file>
Options:
  -V, --version        output the version number
  -d, --debug          output extra debugging
  -p, --path <path>    wrapper dir (default: "/")
  --host <host>        ipfs cluster api host (default: "")
  --port <port>        ipfs cluster api port (default: "")
  --showAll            show all file cid
  -t, --token <token>  ipfs cluster api base auth token (default: "")
  -r, --recursive      recursive all sub dir
  -a, --all            include hidden file
  -h, --help           output usage information
```
output data:
```
{
  path: 'web',
  hash: 'QmdiRp2QU1pYb4r1Hmbfah3Ckqq2p56vDSBarm4VWHSdWg',
  size: 1042
}
```
or use `showAll`
```
[
  {
    path: 'web/index.html',
    hash: 'QmZJZG6WuiKMgXw4YANsgJQE98hmahBN7icxPtx4RoDR4M',
    size: 430
  },
  {
    path: 'web/main.css',
    hash: 'QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH',
    size: 6
  },
  {
    path: 'web/main.js',
    hash: 'QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH',
    size: 6
  },
  {
    path: 'web/sub.html',
    hash: 'QmY3Gn49Dx4ybPwZ8AQ9kFjjWRhr7Y1vVVYp5N9yyYMSg6',
    size: 393
  },
  {
    path: 'web',
    hash: 'QmdiRp2QU1pYb4r1Hmbfah3Ckqq2p56vDSBarm4VWHSdWg',
    size: 1042
  }
]
```

`host`, `port`, `token` support load from config file, default config file is `~/.4everlink/conf.yaml`, for example：
```yaml
host: "127.0.0.1"
port: 9094
token: ""
```
The env `4EVERLINKCONF` set custom config file path, for example:
`export 4EVERLINKCONF=/custom/path`, the config file is `/custom/path/conf.yaml`.

## License

[MIT](LICENSE)
