const wpa_cli = require('wireless-tools/wpa_cli')
const exec = require("child-process-promise").exec

const getNetworks = async interface => {
  return new Promise((resolve, reject) => {
    wpa_cli.scan(interface, (err, data) => {
      if (err) {
        reject(err)
      }
      wpa_cli.scan_results(interface, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  })
}

const getStatus = async interface => {
  return new Promise((resolve, reject) => {
    wpa_cli.status(interface, function(err, status) {
      if (err) {
        reject(err)
      }
      resolve(status)
    })
  })
}

const addNetwork = async interface => {
  return new Promise((resolve, reject) => {
    wpa_cli.add_network(interface, function(err, status) {
      if (err) {
        reject(err)
      }
      resolve(status)
    })
  })
}

const setNetwork = async (interface, id, variable, value) => {
  return new Promise((resolve, reject) => {
    wpa_cli.set_network(interface, id, variable, value, function(err, status) {
      if (err) {
        reject(err)
      }
      resolve(status)
    })
  })
}

const enableNetwork = async (interface, id) => {
  return new Promise((resolve, reject) => {
    wpa_cli.enable_network(interface, id, function(err, status) {
      if (err) {
        reject(err)
      }
      resolve(status)
    })
  })
}

const selectNetwork = async (interface, id) => {
  return new Promise((resolve, reject) => {
    wpa_cli.select_network(interface, id, function(err, status) {
      if (err) {
        reject(err)
      }
      resolve(status)
    })
  })
}

const saveConfig = async interface => {
  return new Promise((resolve, reject) => {
    wpa_cli.save_config(interface, function(err, status) {
      if (err) {
        reject(err)
      }
      resolve(status)
    })
  })
}

const listNetworks = async interface => {
  const result = await exec(`wpa_cli -i${interface} list_networks`)
  if (result.stderr === '') {
    const networks = result.stdout.split('\n').slice(1, -1)
    let listNetworks = []

    for (var i = networks.length - 1; i >= 0; i--) {
      const network = networks[i].split('\t')
      listNetworks[network[1]] = { id: network[0], bssid: network[2], flags: network[3] }
    }
    return listNetworks
  }
  return result.stderr
}

const getNetworkId = async (interface, ssid) => {
  const networks = await listNetworks(interface)
  if (networks[ssid] !== undefined) {
    return networks[ssid].id
  }
  return undefined
}

module.exports = { getNetworks, getStatus, getNetworkId, addNetwork, setNetwork, enableNetwork, selectNetwork, saveConfig }