const fs = require('fs')

const stat = path => {
  return new Promise(function (resolve, reject) {
    fs.stat(path, function (error, result) {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const lstat = path => {
  return new Promise(function (resolve, reject) {
    fs.lstat(path, function (error, result) {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const readdir = path => {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (error, result) {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const mkdir = (path, mode) => {
  return new Promise(function (resolve, reject) {
    fs.mkdir(path, mode, function (error) {
      if (error) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}

const chown = (path, uid, gid) => {
  return new Promise(function (resolve, reject) {
    fs.chown(path, uid, gid, function (error) {
      if (error) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}

const readdirExcludeFiles = path => {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (error, result) {
      if (error) {
        reject(error)
      } else {
        let dirs = []
        for (var i = result.length - 1; i >= 0; i--) {
          if (fs.statSync(`${path}/${result[i]}`).isDirectory()) {
            dirs.unshift(result[i])
          }
        }
        resolve({
          empty: result.length === 0,
          directories: dirs
        })
      }
    })
  })
}

module.exports = { stat, lstat, readdir, mkdir, chown, readdirExcludeFiles }