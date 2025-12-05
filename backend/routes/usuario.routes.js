const express = require('express')
const router = express.Router()

const usuarioController = require('../controller/usuario.controller')
const authMiddleware = require('../middleware/auth.middleware')
const isAdminMiddleware = require('../middleware/isAdmin.middleware')

// Rota pública para cadastro
router.post('/cadastrarCliente', usuarioController.cadastrar)

// Listar usuários (apenas admin)
router.get('/listarCliente', authMiddleware, isAdminMiddleware, usuarioController.listar)



// Atualizar usuário (usuário autenticado)
router.put('/:id', authMiddleware, usuarioController.atualizar)

// Apagar usuário (apenas admin)
router.delete('/apagarCliente/:id', authMiddleware, isAdminMiddleware,usuarioController.apagar)

module.exports = router


