const { exec } = require('child_process')
const systemctl = require('./systemctl')

const updateMPDPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    const mpdConfigFile = '/etc/mpd.conf'
    const isActiveSocket = await systemctl.isActive('mpd.socket')
    const isActiveService = await systemctl.isActive('mpd.service')
    
    exec(`sed -i 's/password .*/password "${password}@read,add,control,admin"/' ${mpdConfigFile}`, (error, stdout, stderr) => {
      if (isActiveSocket === true) {
        systemctl.restart('mpd.socket')
      }
      if (isActiveService === true) {
        systemctl.restart('mpd.service')
      }

      if (error) {
        reject(false)
      }
      resolve(true)
    })
  })
}

module.exports = { updateMPDPassword }