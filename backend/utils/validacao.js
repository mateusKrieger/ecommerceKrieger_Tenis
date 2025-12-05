const { validaCPF } = require('./validaCPF')

function validaEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

function validaTelefone(telefone) {
    if (!telefone) return false

    // Remove tudo que não for número
    telefone = telefone.replace(/\D/g, '')

    return telefone.length === 10 || telefone.length === 11
}


module.exports = { validaEmail, validaTelefone, validaCPF }