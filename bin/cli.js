#!/usr/bin/env node

const { Command } = require('commander')

const program = new Command()
program.version('0.0.1')

program
  .option('-d, --debug', 'output extra debugging')
  .option('-p, --path <path>', 'wrapper dir', '/')
  .option('--host <host>', 'ipfs cluster api host', '')
  .option('--port <port>', 'ipfs cluster api port', '')
  .option('--showAll', 'show all file cid')
  .option('-t, --token <token>', 'ipfs cluster api base auth token', '')
  .option('-r, --recursive', 'recursive all sub dir')
  .option('-a, --all', 'include hidden file')
  .arguments('<file>')
  .action((file)=>{
    run(file)
  })
  program.parse(process.argv)
  


function run(file) {
    const IpfsClusterAPI = require('ipfs-cluster-api')

    const options = program.opts()
    if (options.debug) console.log(options)

    let headers = {}
    const parseHost = require('../src/parse-host')
    const conf = parseHost()
    options.host = options.host || conf.host
    options.port = options.port || conf.port
    options.token = options.token || conf.token
    if(options.token) {
        //dXNlcjp1dnh6Z2NCMThMT1Zv
        headers = {
            authorization: 'Basic ' + options.token
        }
    }
    
    const cluster = IpfsClusterAPI({
        host: options.host,
        port: options.port,
        protocol: 'http',
        headers,
    })
    const loadPath = require('../src/load-path')
    const files = loadPath({path: file,hidden: options.all, ignore: false}, {
        recursive: options.recursive,
    }, options.path)
    cluster.add(files).then(res=>{
        if(!options.showAll && options.recursive) {
            const path = require('path')
            let filePath = path.resolve(file)
            filePath = filePath.split(path.sep).join('/')
            const fullDir = filePath + (filePath.endsWith('/') ? '' : '/')
            let dirName = fullDir.split('/')
            dirName = dirName[dirName.length - 2]
            res = res.filter((item)=>{return item.path==dirName})
        }
        if(options.showAll) {
            console.log(res)
        }
        else{
            console.log(res[0])
        }
    })
}
