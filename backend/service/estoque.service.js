const { Estoque, Produto } = require('../models/rel')

async function movimentarEstoque(dados) {

    const { idProduto, tipo, qtdeMovimento } = dados

    if (!idProduto || !tipo || !qtdeMovimento) {
        throw new Error('Campos obrigatórios não informados!')
    }

    const produto = await Produto.findByPk(idProduto);
    if (!produto) {
        throw new Error("Produto não encontrado!");
    }

    let novaQuantidade = produto.estoque

    if (tipo === 'ENTRADA') {
        novaQuantidade += qtdeMovimento

    } else if (tipo === 'SAIDA') {
        if (produto.estoque < qtdeMovimento) {
            throw new Error("Estoque Insuficiente!")
        }
        novaQuantidade -= qtdeMovimento

    } else {
        throw new Error("Tipo de movimentação inválida!")
    }

    await produto.update({ estoque: novaQuantidade })

    const movimentacao = await Estoque.create({
        idProduto,
        tipo,
        qtdeMovimento
    })

    const quantidadeMinima = 5;

    if (novaQuantidade <= quantidadeMinima) {
        return {
            message: "Atenção! Estoque crítico!",
            estoqueAtual: novaQuantidade,
            estoqueCritico: true,
            movimentacao
        }
    }

    return {
        message: "Estoque movimentado com sucesso!",
        estoqueAtual: novaQuantidade,
        estoqueCritico: false,
        movimentacao
    }
}

module.exports = { movimentarEstoque }