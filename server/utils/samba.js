const { exec } = require('child_process')

const updateSambaPassword = (user, password) => {
  return new Promise(function (resolve, reject) {
    exec(`echo -e '${password}\n${password}' | smbpasswd -s ${user}`, (error, stdout, stderr) => {
      if (error) {
        reject(false)
      }
      resolve(true)
    })
  })
}

module.exports = { updateSambaPassword }