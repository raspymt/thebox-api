const systemctl = require('../utils/systemctl')
const transmission = require('../utils/transmission')
const seafile = require('../utils/seafile')

const statuses = async () => {
  try {
    return {
      mpd: {
        active: await systemctl.isActive('mpd.service mpd.socket')
      },
      mpdgui: {
        active: await systemctl.isActive('ympd.service')
      },
      filesharing: {
        active: await systemctl.isActive('smb.service nmb.service')
      },
      upnpdlna: { 
        active: await systemctl.isActive('minidlna.service minidlna-rescan.service minidlna-rebuild.service'),
        rescanning: await systemctl.isActive('minidlna-rescan.service'),
        rebuilding: await systemctl.isActive('minidlna-rebuild.service')
      },
      torrent: {
        active: await systemctl.isActive('transmission.service'),
        username: await transmission.getTransmissionConfigUsername()
      },
      cloudstorage: {
        active: await systemctl.isActive('seafile-server@thebox.service'),
        storageFolder: await seafile.getStorageFolder()
      },
      wifi: {
        active: await systemctl.isActive('wpa_supplicant@wlan0.service')
      },
      accesspoint: {
        active: await systemctl.isActive('hostapd.service')
      }
    }
  } catch(e) {
    return e
  }
}

const startService = async application => {
  try {
    switch (application) {
      case 'mpd':
        return systemctl.enableNow('mpd.socket')
        break
      case 'mpdgui':
        return systemctl.enableNow('ympd.service')
        break
      case 'filesharing':
        return systemctl.enableNow('smb.service nmb.service')
        break
      case 'torrent':
        return systemctl.enableNow('transmission.service')
        break
      case 'upnpdlna':
        return systemctl.disableNow('minidlna-rescan.service')
          && systemctl.disableNow('minidlna-rebuild.service')
          && systemctl.enableNow('minidlna.service')
        break
      case 'cloudstorage':
        return systemctl.enableNow('seafile-server@thebox.service')
        break
      case 'wifi':
        return systemctl.enableNow('wpa_supplicant@wlan0.service')
        break
      case 'accesspoint':
        return systemctl.enableNow('hostapd.service')
        break
      case 'rescanUpnpDlna':
        return systemctl.stop('minidlna.service')
          && systemctl.stop('minidlna-rebuild.service')
          && systemctl.start('minidlna-rescan.service')
        break
      case 'rebuildUpnpDlna':
        return systemctl.stop('minidlna.service')
          && systemctl.stop('minidlna-rescan.service')
          && systemctl.start('minidlna-rebuild.service')
        break
    }
  } catch (e) {
    return e
  }
}

const stopService = async application => {
  try {
    switch (application) {
      case 'mpd':
        return systemctl.disableNow('mpd.service mpd.socket ympd.service')
        break
      case 'mpdgui':
        return systemctl.disableNow('ympd.service')
        break
      case 'filesharing':
        return systemctl.disableNow('smb.service nmb.service')
        break
      case 'torrent':
        return systemctl.disableNow('transmission.service')
        break
      case 'upnpdlna':
        return systemctl.disableNow('minidlna.service')
          && systemctl.disableNow('minidlna-rescan.service')
          && systemctl.disableNow('minidlna-rebuild.service')
        break
      case 'cloudstorage':
        return systemctl.disableNow('seafile-server@thebox.service')
        break
      case 'wifi':
        return systemctl.disableNow('wpa_supplicant@wlan0.service')
        break
      case 'accesspoint':
        return systemctl.disableNow('hostapd.service')
        break
    }
  } catch (e) {
    return e
  }
}

module.exports = { statuses, startService, stopService }