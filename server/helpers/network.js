const wpa_cli = require('../utils/wpa_cli')
const iw = require('../utils/iw')
const exec = require("child-process-promise").exec

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
        networks[i].ssid = ssidUTF8.stdout.replace('\n', '')
      }
    }
    
    const status = await wpa_cli.getStatus(interface)

    return { networks, status }
  } catch (e) {
    return e
  }
}

module.exports = { list }