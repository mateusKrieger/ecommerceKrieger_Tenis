const { Produto } = require('../models/rel')

async function criarProduto(dados) {

    const { nome, descricao, modelo, preco, imagem_url, ativo } = dados

    if (!nome || !modelo || !preco) {
        throw new Error('Nome, modelo e preço são obrigatórios!')
    }

    const novoProduto = await Produto.create({
        nome,
        descricao,
        modelo,
        preco,
        imagem_url,
        ativo
    })

    return novoProduto
}


const listarProdutos = async () => {
    try {
        const produtos = await Produto.findAll({
            where: { ativo: 1 } // só produtos ativos
        });

        return produtos;
    } catch (error) {
        console.error("Erro no ProdutoService.listarProdutos:", error);
        throw new Error("Erro ao listar produtos!");
    }
};

async function atualizarProduto(id, dados) {

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado!')
    }

    // Atualizar apenas os campos enviados
    await produto.update(dados)

    return produto

}

async function apagarProduto(id) {

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado!')
    }

    // Desativa o produto (MAS não apaga!)
    await produto.update({ ativo: 0 })

    return true
}


module.exports = { criarProduto, listarProdutos, atualizarProduto, apagarProduto }