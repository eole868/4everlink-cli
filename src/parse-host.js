'use strict'
function parseHost() {
    const configDir = process.env.IPFS_CLUSTER_CLIENT_CONF || process.env.HOME + "/.4everlink"
    const fs = require('fs')
    try{
        const path = require('path')
        const fileDir = path.resolve(configDir)
        const fileConfigPath = fileDir + "/conf.yaml"
        const stats = fs.statSync(fileConfigPath)
        if(stats.isFile) {
            const confContent = fs.readFileSync(fileConfigPath, 'utf-8')
            const YAML = require('yaml')
            const host = YAML.parse(confContent)
            return host
        }
    }catch(e) {
        //console.log(e)
    }
    return {
        host: '127.0.0.1',
        port: '9094',
        token: '',
    }
}

exports = module.exports = parseHost