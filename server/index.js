const Koa = require('koa-plus')
const serve = require('koa-static')
const bodyParser = require("koa-bodyparser")

/**
 * Routes
 */
const baseRoutes = require("./routes/base.routes")
const usersRoutes = require("./routes/users.routes")
const rpcRoutes = require("./routes/rpc.routes")

const PORT = process.env.PORT || require('../config').port
const debug = process.env.NODE_ENV !== 'production'

const app = new Koa({
  // must be set to true if the SAP is not on the same server
  cors: {
    // enabled: true
    enabled: debug
  },
  body: {
    enabled: false
  },
  compress: {
    enabled: false
  },
  debug: {
    enabled: debug
  },
  etag: {
    enabled: false
  },
  helmet: {
    enabled: false
  },
  json: {
    enabled: false
  },
  logger: {
    enabled: debug
  },
  requestId: {
    enabled: false
  },
  responseTime: {
    enabled: false
  }
})

app.use(bodyParser())

app.use(baseRoutes.routes())
app.use(usersRoutes.routes())
app.use(rpcRoutes.routes())

// static directory serving
app.use(serve('dist/'))

const server = app.listen(PORT).on("error", err => {
 console.error(err)
})

module.exports = server
