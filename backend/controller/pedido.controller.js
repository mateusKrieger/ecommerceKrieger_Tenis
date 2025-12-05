const { finalizarPedido, buscarPedidosDoUsuario } = require('../service/pedido.service')

async function criarPedido(req, res) {
    try {
        const idUsuario = req.user.id  // do middleware JWT
        const dados = await finalizarPedido(req.body, idUsuario)

        return res.status(201).json(dados)

    } catch (err) {
        console.error("Erro ao finalizar pedido:", err)
        return res.status(400).json({ message: err.message })
    }
}

async function listarDoUsuario(req, res) {
    try {
        const userId = req.user.id

        const pedidos = await buscarPedidosDoUsuario(userId)

        res.json(pedidos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = { criarPedido, listarDoUsuario }