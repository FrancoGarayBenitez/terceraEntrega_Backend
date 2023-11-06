const {Router} = require('express')
const router = Router()

const orderControllers = require('../controllers/orderControllers')

router.get("/", orderControllers.getOrder)
router.get("/:oid", orderControllers.getOrderById)
router.post("/", orderControllers.createOrder)
router.put("/:oid", orderControllers.resolveOrder)

module.exports = router