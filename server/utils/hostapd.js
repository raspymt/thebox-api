const exec = require("child-process-promise").exec
const systemctl = require('./systemctl')

const hostapdConfigFile = '/etc/hostapd/hostapd.conf'
const hostapdPskFile = '/etc/hostapd/hostapd-psk'

const getHostapdSsid = async () => {
  try {
    const ssid = await exec(`sed -n '/^ssid=/p' ${hostapdConfigFile}`)
    if (ssid.stderr === '') {
      return ssid.stdout.replace('ssid=', '')
    }
    return false
  } catch (e) {
    console.log(e)
  }

}

const updateHostapdAccesspoint = async (ssid, password) => {
  try {
    const pwd = password.split("\\").join("\\\\").split("$").join("\\\$").split("\"").join("\\\"").split("`").join("\\\`")

    // replace SSID name and generate new encrypted password
    const result = await exec(`sudo sed -ie 's/^ssid=.*/ssid=${ssid}/' ${hostapdConfigFile} && wpa_passphrase "${ssid}" "${pwd}" | grep -P  "^\tpsk" | cut -d = -f 2 | awk '{print "00:00:00:00:00:00 " $1}' | sudo tee ${hostapdPskFile} > /dev/null`)

    const isActive = await systemctl.isActive('hostapd.service')
    if (isActive === true) {
      // must start service after changing password
      systemctl.restart('hostapd.service')
    }
    if(result.stderr === '') {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = { getHostapdSsid, updateHostapdAccesspoint }