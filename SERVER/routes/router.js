const express = require('express')
const router = express.Router()
const controller = require('../controllers/main')

router.post('/createObj', (req, res) => controller.createObj(req, res))
router.get('/findProducts', (req, res) => controller.findProducts(req, res))

router.get('/deleteProduct/:id', (req, res) => controller.deleteProduct(req, res))
router.get('/addProduct/:id', (req, res) => controller.addProduct(req, res))
router.get('/reduceProduct/:id', (req, res) => controller.reduceProduct(req, res))




module.exports = router









// router.post('/updateAmount', (req, res) => controller.updateAmount(req, res))