const system = require('../helpers/system')
const services = require('../helpers/services')
const network = require('../helpers/network')
const filesharing = require('../helpers/filesharing')
const mpd = require('../helpers/mpd')
const torrent = require('../helpers/torrent')
const filesystem = require('../helpers/filesystem')
const cloudstorage = require('../helpers/cloudstorage')



const get = async ctx => {
  try {
    const params = ctx.request.query
    const action = params.action
    let res = {}

    switch (action) {
      case 'medias':
        res = await system[action]()
        break
      case 'statuses':
        res = await services[action]()
        break
      case 'networks':
        res = await network.list()
        break
      case 'listDirectories':
        res = await filesystem.listDirectories(params.directory)
        break
      default:
        throw new Error('Action not found')
        break
    }
   
    ctx.body = res;
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      error: e
    }
  }
}

const set = async ctx => {
  try {
    const params = ctx.request.query
    const action = params.action
    let res = {}

    switch (action) {
      case 'poweroff':
      case 'reboot':
        res = await system[action]()
        break
      case 'unmount':
        res = await systemm[action](params.media)
        break
      case 'startService':
      case 'stopService':
        res = await services[action](params.service)
        break
      case 'rescanUpnpDlna':
      case 'rebuildUpnpDlna':
        res = await services[action]()
        break
      case 'filesharingCredentials':
        res = await filesharing.updatePassword(params.credentials)
        break
      case 'mpdCredentials':
        res = await mpd.updatePassword(params.credentials)
        break
      case 'torrentCredentials':
        res = await torrent.updateCredentials(params.credentials)
        break
      case 'createCloudStorageDirectory':
        res = await cloudstorage.createStorageDirectory(params.directory)
        break
      case 'setCloudStorageDirectory':
        res = await cloudstorage.setStorageDirectory(params.directory, params.recovery)
        break
      default:
        throw new Error('Action not found')
        break
    }
   
    ctx.body = res;
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      error: e
    }
  }
}

module.exports = { get, set }