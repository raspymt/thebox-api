const wpa_cli = require('../utils/wpa_cli')
const iw = require('../utils/iw')

const interface = 'wlan0'
const testChar = /(\\x[\d\w]{2})/g;

const list = async () => {
  try {
    let networks = await iw.getNetworks(interface)
    networks.sort((a, b) => {
      return b.signal - a.signal
    })

    networks.map((e) => {

      // while ((m = testChar.exec(e.ssid)) !== null) {
      //   // This is necessary to avoid infinite loops with zero-width matches
      //   if (m.index === testChar.lastIndex) {
      //     testChar.lastIndex++;
      //   }
        
      //   // The result can be accessed through the `m`-variable.
      //   m.forEach((match) => {
      //     // console.log(`${match.replace('\\x', '0x')} : ${String.fromCharCode(match.replace('\\x', '0x'))}`);
      //     // console.log(`${decodeUTF16LE(match.replace('\\x', '0x'))} : ${String.fromCharCode(match.replace('\\x', '0x'))}`);
      //   });
      // }
    })

    const status = await wpa_cli.getStatus(interface)

    return { networks, status }
  } catch (e) {
    return e
  }
}

module.exports = { list }