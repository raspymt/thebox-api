const BASE_URL = `${require('../../config').api}`

const Router = require("koa-router")
const router = new Router()
const baseController = require("../controllers/baseController")

router.get(`${BASE_URL}/online`, baseController.online)

module.exports = router