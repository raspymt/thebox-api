const wpa_cli = require('../utils/wpa_cli')
const wpa_supplicant = require('../utils/wpa_supplicant')
const iw = require('../utils/iw')
const exec = require("child-process-promise").exec
const systemctl = require('../utils/systemctl')

const interface = 'wlan0'
const testChar = /(\\x[\d\w]{2})/g;

const list = async () => {
  try {
    let networks = await iw.getNetworks(interface)
    networks.sort((a, b) => {
      return b.signal - a.signal
    })

    for (var i = networks.length - 1; i >= 0; i--) {
      let ssidUTF8 = await exec(`echo $'${networks[i].ssid}'`)
      if(ssidUTF8.stderr === ''){
        networks[i].ssidPre = networks[i].ssid
        networks[i].ssid = ssidUTF8.stdout.replace('\n', '').replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
          return '&#'+i.charCodeAt(0)+';'
        });
      }
    }
    
    const status = await wpa_cli.getStatus(interface)

    return { networks, status }
  } catch (e) {
    return e
  }
}

const connectWifi = async network => {
  try {
    // if hostapd AP run on different channel than the selected WIFI
    // we need to stop hostapd before configurinng WIFI
    const hostapdActive = await systemctl.isActive('hostapd.service')
    let stopHostapd, hostapdChannel
    if (hostapdActive === true) {
      // check hostapd channel
      hostapdChannel = await exec('iw dev uap0 info|grep channel|cut -d" " -f2')
      hostapdChannel = hostapdChannel.stdout.trim()
      // hostapd and wifi network on different channel
      // we stop hostapd
      if (hostapdChannel !== network.channel) {
        stopHostapd = await systemctl.stop('hostapd.service')
      }
    }
    if (stopHostapd === true || hostapdActive === false || hostapdChannel === network.channel) {
      let netId = await wpa_cli.getNetworkId(interface, network.ssidPre)

      if (netId === undefined) {
        netId = await wpa_cli.addNetwork(interface)
        netId = netId.result
      }

      if (netId !== undefined) {
        // set network ssid and passphrase
        const resSsid = await wpa_cli.setNetwork(interface, netId, 'ssid', `'"${network.ssidPre}"'`)
        let resPsk
        if (network.security === 'open') {
          resPsk = await wpa_cli.setNetwork(interface, netId, 'key_mgmt', 'NONE')
        } else {
          // convert passphrase
          const psk = await exec(`wpa_passphrase ${network.ssidPre} ${network.passphrase} | grep $'\\tpsk' | cut -d'=' -f2`)
          if (psk.stderr === '') {
            resPsk = await wpa_cli.setNetwork(interface, netId, 'psk', psk.stdout.trim())
          }
        }

        if (resSsid.result == 'OK' && resPsk.result == 'OK') {
          // connect to network
          const connected = await wpa_cli.selectNetwork(interface, netId)
          
          if (connected.result == 'OK') {
            // save wpa_supplicant config
            const saveConfig = await wpa_cli.saveConfig(interface)
            if (hostapdActive === true && stopHostapd === true) {
              systemctl.start('hostapd.service')
            }
            return true
          }
        }
      }
    }

    if (hostapdActive === true && stopHostapd === true) {
      // console.log('Restarting hostapd')
      systemctl.start('hostapd.service')
    }
    return false
  } catch (e) {
    return e
  }
}

module.exports = { list, connectWifi }