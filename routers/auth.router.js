const router = require('express').Router()

const controller = require('../controllers/auth.controller')

router.get('/register', controller.viewRegister) 
router.get('/login', controller.viewLogin)
router.get('/dashboard', controller.viewDashboard)
// router.get('/dashboard/biodata', controller.viewBiodata)
router.get('/dashboard/history', controller.viewHistory)

router.post('/create-register', controller.creatRegister)
router.post('/create-login', controller.createLogin)
// router.post('/create-biodata', controller.createBiodata)
router.post('/create-history', controller.createHistory)

module.exports = router