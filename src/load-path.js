'use strict'
function loadPaths (dir,opts, prefix="") {
    const path = require('path')
    const fs = require('fs')
    const glob = require('glob')
  
    const followSymlinks = dir.followSymlinks != null ? dir.followSymlinks : true
  
    let file = path.resolve(dir.path)
    const stats = fs.statSync(file)
    if(!prefix.endsWith('/')) {
      prefix += '/'
    }
  
    if (stats.isDirectory() && !opts.recursive) {
      throw new Error('Can only add directories using --recursive')
    }
  
    if (stats.isDirectory()) {
      // glob requires a POSIX filename
      file = file.split(path.sep).join('/')
      const fullDir = file + (file.endsWith('/') ? '' : '/')
      let dirName = fullDir.split('/')
      
      dirName = prefix + dirName[dirName.length - 2] + '/'
      const mg = new glob.sync.GlobSync('**/*', {
        cwd: file,
        follow: followSymlinks,
        dot: dir.hidden,
        ignore: dir.ignore
      })
  
      return mg.found
        .map((name) => {
          const fqn = fullDir + name
          // symlinks
          if (mg.symlinks[fqn] === true) {
            return {
              path: dirName + name,
              //symlink: true,
              //dir: false,
              content: fs.readlinkSync(fqn)
            }
          }
  
          // files
          if (mg.cache[fqn] === 'FILE') {
            return {
              path: dirName + name,
              //symlink: false,
              //dir: false,
              content: fs.createReadStream(fqn)
            }
          }
  
          // directories
          if (mg.cache[fqn] === 'DIR' || mg.cache[fqn] instanceof Array) {
            return {
              path: dirName + name,
              //symlink: false,
              //dir: true
            }
          }
          // files inside symlinks and others
        })
        // filter out null files
        .filter(Boolean)
    }
  
    return {
      path: prefix + path.basename(file),
      content: fs.createReadStream(file)
    }
  }

  exports = module.exports = loadPaths