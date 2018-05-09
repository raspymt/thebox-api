const online = async ctx => {
  try {
    ctx.body = {
      online: true
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      error: e
    }    
  }
}

module.exports = { online }