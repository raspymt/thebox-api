const atob = require('atob')
const { updateMPDPassword } = require('../utils/mpd')

const updatePassword = async credentials => {
  try {
    const password = atob(credentials.replace('UpdatePassword ', ''))
    return updateMPDPassword(password)
  } catch (e) {
    return e
  }
}

module.exports = { updatePassword }