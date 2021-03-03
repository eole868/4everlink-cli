<h3 align="center">使用IPFS Cluster HTTP API上传文件到IPFS集群.</h3>

[![NPM Version](https://img.shields.io/npm/v/@4everlink/cli)](https://www.npmjs.org/package/@4everlink/cli)
[![Install Size](https://packagephobia.now.sh/badge?p=@4everlink/cli)](https://packagephobia.now.sh/result?p=@4everlink/cli)
![License](https://img.shields.io/npm/l/@4everlink/cli)

使用其他语言阅读: [English](./README.md) | 简体中文

## 安装

使用下面命令安装:

```
npm install -g @4everlink/cli
```

## 命令

```
Usage: 4everlink [options] [command]

Options:
  -V, --version         output the version number
  -h, --help            output usage information

Commands:
  config <arg> [value]  set or show config for host
  add [options] <file>  upload file
```
### **`add`**
```
$ 4everlink add --help
Usage: 4everlink add [options] <file>
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
返回格式如下:
```
{
  path: 'web',
  hash: 'QmdiRp2QU1pYb4r1Hmbfah3Ckqq2p56vDSBarm4VWHSdWg',
  size: 1042
}
```
或者使用`--showAll`参数
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

`host`, `port`, `token`参数支持通过配置文件配置， 默认配置文件为`~/.4everlink/conf.yaml`,配置文件如下：
```yaml
host: "127.0.0.1"
port: 9094
token: ""
```
配置文件路径可以使用`_4EVERLINKCONF`环境变量自定义设置。例如:
`export _4EVERLINKCONF=/custom/path`, 配置文件为: `/custom/path/conf.yaml`。

### **`config`**
```
$ 4everlink config --help
Usage: 4everlink config [options] <arg> [value]

set or show config for host

Arguments:

  arg         the params to set, maybe host、port or token
  value       the value to set

Options:
  -h, --help  output usage information
```
设置host为`127.0.0.1`:  `4everlink config host "127.0.0.1"`;
查看当前host配置: `4everlink config host `

## 许可证

[MIT](LICENSE)
