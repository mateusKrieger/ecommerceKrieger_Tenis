const Usuario = require('../models/Usuario')
const { validaEmail, validaTelefone, validaCPF } = require('../utils/validacao')
const { hashSenha } = require('./bcrypt.service')

// ======================= CADASTRAR ==========================
async function cadastrar(dados) {
    const { nome, email, telefone, cpf, identidade, senha, tipo_usuario } = dados

    if (!nome || !email || !telefone || !cpf || !senha) {
        throw new Error('Campos obrigatórios não informados!')
    }

    if (!validaEmail(email)) throw new Error('Email inválido!')
     const telefoneLimpo = telefone.replace(/\D/g, '')

    if (!validaTelefone(telefoneLimpo)) throw new Error('Telefone inválido!')

    if (!validaCPF(cpf)) throw new Error('CPF inválido!')

    if (await Usuario.findOne({ where: { email } })) {
        throw new Error('Email já cadastrado!')
    }

    if (await Usuario.findOne({ where: { cpf } })) {
        throw new Error('CPF já cadastrado!')
    }

    const senhaBcrypt = await hashSenha(senha)

    await Usuario.create({
        nome,
        email,
        telefone,
        cpf,
        identidade,
        senha: senhaBcrypt,
        tipo_usuario: tipo_usuario
    })

    return { ok: true }
}

async function listar() {
    return await Usuario.findAll({
        attributes: { exclude: ['senha'] }
    })
}

async function buscarUsuarioLogado(id) {
    const usuario = await Usuario.findByPk(id, {
        attributes: { exclude: ['senha'] }
    });
    if (!usuario) {
        throw new Error("Usuário não encontrado!");
    }
    return usuario;
}

async function atualizar(id, dados) {
    const usuario = await Usuario.findByPk(id)

    if (!usuario) {
        throw new Error('Usuário não encontrado!')
    }

    // Bloqueia edição de campos sensíveis
    delete dados.email
    delete dados.cpf
    delete dados.senha
    delete dados.tipo_usuario

    await usuario.update(dados)

    return { message: "Dados atualizados com sucesso!", usuario }
}

async function apagar(id) {
    const usuario = await Usuario.findByPk(id)

    if (!usuario) {
        throw new Error('Usuário não encontrado!')
    }

    await Usuario.destroy({ where: { codUsuario: id } })

    return { ok: true }
}

module.exports = { cadastrar, listar, atualizar, apagar, buscarUsuarioLogado }
