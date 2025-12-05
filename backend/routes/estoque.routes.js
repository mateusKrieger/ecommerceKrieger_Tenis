 const express = require('express')
const router = express.Router()

const { movimentar } = require('../controller/estoque.controller')

const authMiddleware = require('../middleware/auth.middleware')
const isAdminMiddleware = require('../middleware/isAdmin.middleware')

router.post(
    '/',
    authMiddleware,
    isAdminMiddleware,
    movimentar
)

module.exports = router