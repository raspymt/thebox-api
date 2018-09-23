const exec = require("child-process-promise").exec
const systemctl = require('./systemctl')

const transmissionConfigFile = '/home/thebox/.config/transmission-daemon/settings.json'

const updateTransmissionConfigCredentials = async (username, password) => {
  try {
    const isActive = await systemctl.isActive('transmission.service')
    let transmissionService = true
    if (isActive === true) {
      // must stop service before changing password
      transmissionService = await systemctl.stop('transmission.service')    
    }

    if (transmissionService === true) {
      const result = await exec(`sudo sed -i 's/   "rpc-username".*/   "rpc-username": "${username}",/' ${transmissionConfigFile} && sudo sed -i 's/   "rpc-password".*/   "rpc-password": "${password}",/' ${transmissionConfigFile}`)

      if (isActive === true) {
        // must start service after changing password
        systemctl.start('transmission.service')
      }
      if(result.stderr === '') {
        return true        
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
  }
}

const getTransmissionConfigUsername = async () => {
  try {
    const username = await exec(`sed -n 's/    \"rpc-username\": \"\\(.*\\)\",/\\1/p' ${transmissionConfigFile}`)
    if (username.stderr === '') {
      return username.stdout.replace('\n', '')
    }
    return false
  } catch (e) {
    console.log(e)
  }
}

module.exports = { updateTransmissionConfigCredentials, getTransmissionConfigUsername }