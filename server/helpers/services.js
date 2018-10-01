const systemctl = require('../utils/systemctl')
const transmission = require('../utils/transmission')
const hostapd = require('../utils/hostapd')

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
      wifi: {
        active: await systemctl.isActive('supplicant@wlan0.service')
      },
      accesspoint: {
        active: await systemctl.isActive('hostapd.service'),
        ssid: await hostapd.getHostapdSsid()
      },
      ssh: {
        active: await systemctl.isActive('sshd.service')
      },
      syncthing: {
        active: await systemctl.isActive('syncthing@thebox.service')
      },
      resilio: {
        active: await systemctl.isActive('rslsync.service')
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
      case 'wifi':
        return systemctl.enableNow('supplicant@wlan0.service')
        break
      case 'accesspoint':
        return systemctl.enableNow('hostapd.service')
        break
      // case 'ssh':
      //   return systemctl.enableNow('sshd.service')
      //   break
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
      case 'syncthing':
        return systemctl.enableNow('syncthing@thebox.service')
        break
      case 'resilio':
        return systemctl.enableNow('rslsync.service')
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
      case 'wifi':
        return systemctl.disableNow('supplicant@wlan0.service')
        break
      case 'accesspoint':
        return systemctl.disableNow('hostapd.service')
        break
      // case 'ssh':
      //   return systemctl.disableNow('sshd.service')
      //   break
      case 'syncthing':
        return systemctl.disableNow('syncthing@thebox.service')
        break
      case 'resilio':
        return systemctl.disableNow('rslsync.service')
        break
    }
  } catch (e) {
    return e
  }
}

module.exports = { statuses, startService, stopService }