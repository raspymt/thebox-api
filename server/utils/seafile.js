const mediaDir = require('../../config.js').mediaDir
const knex = require("knex")(require("../../config")['knex'])
const path = require('path')
const exec = require("child-process-promise").exec
const filesystem = require('./filesystem')
const systemctl = require('./systemctl')
const seafileServerService = 'seafile-server@thebox.service'

const getStorageFolder = async () => {
  try {
    const seafile = await knex('seafile').select().first()
    const seafileDir = path.join(mediaDir, path.resolve(seafile.storage))
    const s = await filesystem.lstat(seafileDir)
    return s.isDirectory() === true ? seafile.storage : false
  } catch (e) {
    return ''
  }
}

const createStorageFolder = async dir => {
try {
    const p = path.join(mediaDir, path.resolve(dir))
    const fileCreated = await filesystem.mkdir(p, 755)
    let ownerChanged
    if (fileCreated === true) {
      const uid = await exec("id seafile | sed -r 's/^uid=([0-9]*).*/\\1/g'")
      const id = parseInt(uid.stdout.replace('\n', ''))
      ownerChanged = await filesystem.chown(p, id, id)
    } else {
      return {
        result: false,
        error: 'notcreated'
      }
    }
    return fileCreated && ownerChanged
  } catch (e) {
    if (e.code === 'EEXIST') {
      return {
        result: false,
        error: 'exist'
      }
    }
    return e
  }
}

const setStorageFolder = async (dir, recovery) => {
  try {
    const seafile = await knex('seafile').select().first()
    const seafileOldDir = path.join(mediaDir, path.resolve(seafile.storage))
    const sNewDir = path.resolve(dir)
    const seafileNewDir = path.join(mediaDir, sNewDir)
    const sOld = await filesystem.lstat(seafileOldDir)
    const sNew = await filesystem.lstat(seafileNewDir)
    const seafileIsActive = await systemctl.isActive(seafileServerService)
    let cmd = ''

    if (recovery === 'true' && sNew.isDirectory() === true) {
      cmd = `unlink /srv/seafile/thebox/seafile-data && ln -s '${seafileNewDir}' /srv/seafile/thebox/seafile-data`
    } else if (sOld.isDirectory() === true && sNew.isDirectory() === true) {
      cmd = `mv '${seafileOldDir}/'* '${seafileNewDir}/' && unlink /srv/seafile/thebox/seafile-data && ln -s '${seafileNewDir}' /srv/seafile/thebox/seafile-data`
    } else {
      return false
    }

    const seafileServerServiceStopped = seafileIsActive === true ? await systemctl.stop(seafileServerService) : true
    if (seafileServerServiceStopped === true) {
      const uid = await exec("id seafile | sed -r 's/^uid=([0-9]*).*/\\1/g'")
      const id = parseInt(uid.stdout.replace('\n', ''))
      const ownerChanged = await filesystem.chown(seafileNewDir, id, id)
      if (ownerChanged === true) {
        const res = await exec(cmd)
        if (res.stderr === '') {
          const resKnex = await knex('seafile').first().update({ storage: sNewDir })
          if (resKnex === 1) {
            if (seafileIsActive === true) {
              return systemctl.start(seafileServerService)
            } else {
              return true              
            }
          }
        }        
      }
    }
    return false
  } catch (e) {
    return e
  }
}

module.exports = { getStorageFolder, createStorageFolder, setStorageFolder }