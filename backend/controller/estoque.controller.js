const { movimentarEstoque } = require('../service/estoque.service')

async function movimentar(req, res) {
    try {
        const dados = await movimentarEstoque(req.body)

        return res.status(201).json(dados)
    } catch (err) {
        console.error("Erro ao movimentar estoque:", err)
        return res.status(400).json({ message: err.message })
    }
}

module.exports = { movimentar }