const atob = require('atob')
const { updateSambaPassword } = require('../utils/samba')

const updatePassword = async credentials => {
  try {
    const password = atob(credentials.replace('UpdatePassword ', ''))
    return updateSambaPassword('thebox', password)
  } catch (e) {
    return e
  }
}

module.exports = { updatePassword }