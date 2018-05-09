const BASE_URL = `${require('../../config').api}/rpc`

const Router = require("koa-router")
const router = new Router()
const rpcController = require("../controllers/rpcController")
const jwt = require('../middlewares/jwt')
const rpc = require('../middlewares/rpc')

router.get(`${BASE_URL}`, jwt, rpc, rpcController.get)
router.post(`${BASE_URL}`, jwt, rpc, rpcController.set)

module.exports = router