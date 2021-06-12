const Router = require('express')
const router = new Router()
const tuplesController = require('../controllers/tuplesController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', checkRole('ADMIN'), tuplesController.getAllTup)
router.get('/:userId', checkRole('USER'), authMiddleware, tuplesController.getAllUserTup)
router.post('/', tuplesController.saveTup)
router.post('/update', tuplesController.updateTup)
router.delete('/',tuplesController.deleteTup)

module.exports = router
