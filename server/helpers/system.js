const systemctl = require('../utils/systemctl')
const fs = require('../utils/filesystem')
const exec = require("child-process-promise").exec

const reboot = async () => {
  try {
    return systemctl.reboot()
  } catch (e) {
    return e
  }
}

const poweroff = async () => {
  try {
    return systemctl.poweroff()
  } catch (e) {
    return e
  }
}

const unmount = async media => {
  try {
    return systemctl.stop(`usb-mount@${media}.service`)
  } catch (e) {
    return e
  }
}

const medias = async () => {
  try {
    const mounts = await fs.readdir('/media')
    const results = {}
    for (var i = mounts.length - 1; i >= 0; i--) {
      const dev = await exec(`lsblk -P | grep '\"part\" MOUNTPOINT=\"/media/${mounts[i]}\"' | sed -n 's/NAME=\"\\([0-9a-zA-Z]*\\)\".*/\\1/p'`)
      results[dev.stdout.replace('\n', '')] = mounts[i]
    }
    return results
  } catch (e) {
    return e
  }
}

module.exports = { reboot, poweroff, unmount, medias }