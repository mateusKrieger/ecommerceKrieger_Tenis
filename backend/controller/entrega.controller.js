const { criarEntrega } = require('../service/entrega.service')

async function cadastrarEntrega(req, res) {
    try {
        const dados = await criarEntrega(req.body)
        return res.status(201).json(dados)
    } catch (error) {
        console.error("Erro ao cadastrar entrega:", error)
        return res.status(400).json({ message: error.message })
    }
}

module.exports = { cadastrarEntrega }
