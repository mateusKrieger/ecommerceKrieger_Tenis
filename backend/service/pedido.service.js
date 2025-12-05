const { Pedido, ItemPedido, Produto, Usuario } = require('../models/rel')

async function finalizarPedido(dados, idUsuario) {
    const { itens } = dados

    if (!itens || itens.length === 0) {
        throw new Error("Carrinho vazio!")
    }

    const usuario = await Usuario.findByPk(idUsuario)
    if (!usuario) {
        throw new Error("Usuário não encontrado!")
    }

    let valorSubtotal = 0

    for (let item of itens) {

        const produto = await Produto.findByPk(item.id)
        if (!produto) {
            throw new Error(`Produto ${item.id} não encontrado!`)
        }

        // Verifica estoque antes de tudo
        if (produto.estoque < item.qtd) {
            throw new Error(`Estoque insuficiente para ${produto.nome}. Disponível: ${produto.estoque}`)
        }

        valorSubtotal += Number(produto.preco) * Number(item.qtd)
    }

    const pedido = await Pedido.create({
        idUsuario,
        valorSubtotal,
        valorFrete: 0,
        valorTotal: valorSubtotal
    })

    for (let item of itens) {
        const produto = await Produto.findByPk(item.id)

        await ItemPedido.create({
            idPedido: pedido.codPedido,
            idProduto: produto.codProduto,
            quantidade: item.qtd,
            precoUnitario: produto.preco,
            valorTotalItem: produto.preco * item.qtd
        })

        // Desconta o estoque
        const { movimentarEstoque } = require('../service/estoque.service')

        // Dentro do loop de itens:

        await movimentarEstoque({
            idProduto: produto.codProduto,
            tipo: 'SAIDA',
            qtdeMovimento: item.qtd
        })
    }

    return {
        message: "Pedido criado com sucesso!",
        codPedido: pedido.codPedido,
        valorTotal: pedido.valorTotal
    }
}

async function buscarPedidosDoUsuario(userId) {
    const pedidos = await Pedido.findAll({
        where: { idUsuario: userId },
        order: [['createdAt', 'DESC']], // Último pedido primeiro
    })

    return pedidos
}

module.exports = { finalizarPedido, buscarPedidosDoUsuario }