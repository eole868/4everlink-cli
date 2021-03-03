'use strict'

const fs = require('fs')
function configLoc() {
    const configDir = process.env['_4EVERLINKCONF'] || process.env.HOME + "/.4everlink"

    const fs = require('fs')
    const path = require('path')
    const fileDir = path.resolve(configDir)
    fs.mkdirSync(fileDir, {recursive: true})
    return fileDir + "/conf.yaml"
}
function configExists() {
    const config = configLoc
    try{
        const stats = fs.statSync(config)
        return stats.isFile
    }catch(e) {
    }
    return false
}
function initConf(configContent) {
    const loc = configLoc()
    try{
        const stats = fs.statSync(config)
        if(stats.isDirectory()) {
            fs.rmdirSync(config, {recursive: true})
        }else{
            return stats.isFile
        }
    }catch(e) {
    }
    const YAML = require('yaml')
    fs.writeFileSync(loc, YAML.stringify(configContent))
    return true
}
function updateConf(configContent) {
    if(!configExists()) {
        initConf(configContent)
    }
    const loc = configLoc()
    const stats = fs.statSync(loc)
    if(stats.isDirectory()) {
        throw new Error(`conf file: ${loc} is a directory`)
    }
    const YAML = require('yaml')
    fs.writeFileSync(loc, YAML.stringify(configContent))
}

exports = module.exports = {
    updateConf, initConf, configExists, configLoc
}