const atob = require('atob')
const { updateHostapdAccesspoint } = require('../utils/hostapd')

const updateAccesspoint = async credentials => {
  try {
    const c = atob(credentials.replace('UpdateSSID ', '')).split(':')
    return updateHostapdAccesspoint(c[0], c[1])
  } catch (e) {
    return e
  }

}

module.exports = { updateAccesspoint }