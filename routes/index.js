const Router = require('express')
const router = new Router()
const tuplesRouter = require('./tuplesRouter')
const algRouter = require('./algRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/alg', algRouter)
router.use('/tuples', tuplesRouter)

module.exports = router
