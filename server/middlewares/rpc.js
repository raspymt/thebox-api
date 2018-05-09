const URL = require('url')
const atob = require('atob')

module.exports = async (ctx, next) => {
  const params = ctx.request.method === 'GET' ? ctx.query.s : ctx.request.body.params.s
  ctx.query = JSON.parse(atob(params))
  return next()
}