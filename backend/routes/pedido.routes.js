const express = require('express')
const router = express.Router()

const { criarPedido, listarDoUsuario } = require('../controller/pedido.controller')

const authMiddleware = require('../middleware/auth.middleware')

router.post(
    '/',
    authMiddleware,
    criarPedido
)

router.get(
    '/me',
    authMiddleware,
    listarDoUsuario
)

module.exports = router