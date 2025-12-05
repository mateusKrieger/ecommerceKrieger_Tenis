const express = require('express')
const router = express.Router()

const { cadastrarEntrega } = require('../controller/entrega.controller')

const authMiddleware = require('../middleware/auth.middleware')

router.post(
    '/',
    authMiddleware,
    cadastrarEntrega
)

module.exports = router