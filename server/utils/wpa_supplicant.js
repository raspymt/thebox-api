const wpa_supplicant = require('wireless-tools/wpa_supplicant')

const enable = async options => {
  return new Promise((resolve, reject) => {
    wpa_supplicant.enable(options, function(err) {
      if (err) {
        reject(err)
      }
      resolve(true)
    })
  })
}

module.exports = { enable }