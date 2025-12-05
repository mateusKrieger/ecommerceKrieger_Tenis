const Entrega = require('../models/Entrega')

async function criarEntrega(dados) {

    const entrega = await Entrega.create({
        idPedido: dados.idPedido,
        cep: dados.cep,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        localidade: dados.localidade,
        uf: dados.uf,
        numero: dados.numero,
        complemento: dados.complemento
    })

    return {
        message: "Endereço de entrega salvo com sucesso!",
        entrega
    }
}

module.exports = { criarEntrega }