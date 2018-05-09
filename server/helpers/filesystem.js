const filesystem = require('../utils/filesystem')
const path = require('path')

const mediaDir = require('../../config.js').mediaDir

const listDirectories = async dir => {
  try {
    // const p = path.resolve(dir !== undefined && dir !== '' ? dir : '/')
    const p = path.resolve(dir)
    const result = await filesystem.readdirExcludeFiles(path.join(mediaDir, p))

    return Object.assign({path: p}, result)
  } catch (e) {
    return e
  }
}

module.exports = { listDirectories }