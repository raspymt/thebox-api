const path = require('path')
const filesystem = require('../utils/filesystem')
const seafile = require('../utils/seafile')

const setStorageDirectory = async (dir, recovery) => {
  try {
    return seafile.setStorageFolder(path.resolve(dir), recovery)
  } catch (e) {
    return e
  }
}

const createStorageDirectory = async dir => {
  try {
    return seafile.createStorageFolder(path.resolve(dir))
  } catch (e) {
    return e
  }
}

module.exports = { setStorageDirectory, createStorageDirectory }