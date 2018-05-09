const atob = require('atob')
const { updateTransmissionConfigCredentials } = require('../utils/transmission')

const updateCredentials = async credentials => {
  try {
    const c = atob(credentials.replace('UpdateCredentials ', '')).split(':')
    return updateTransmissionConfigCredentials(c[0], c[1])
  } catch (e) {
    return e
  }
}

module.exports = { updateCredentials }