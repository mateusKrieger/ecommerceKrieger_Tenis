const usuarioService = require('../service/usuario.service')

async function cadastrar(req, res) {
    const valores = req.body

    if (!valores.nome ||
        !valores.email ||
        !valores.senha ||
        !valores.telefone ||
        !valores.cpf) {
            return res.status(400).json({ message: "Preencha todos os campos obrigatórios!" })
    }

    try {
        const dados = await usuarioService.cadastrar(valores)
        return res.status(201).json(dados)
    } catch (err) {
        console.error("Erro no controller de cadastro:", err)
        return res.status(400).json({ message: err.message })
    }
}

async function listar(req, res) {
    try {
        const dados = await usuarioService.listar()
        return res.status(200).json(dados)
    } catch (err) {
        console.error("Erro ao listar usuários!", err)
        return res.status(500).json({ message: "Erro ao listar usuários!" })
    }
}

async function getUsuarioLogado(req, res) {
    try {
        const idUsuario = req.user.id;
        const usuario = await usuarioService.buscarUsuarioLogado(idUsuario);
        res.status(200).json(usuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function atualizar(req, res) {
    const valores = req.body
    const id = req.user.id

    if (!valores.nome &&
        !valores.telefone &&
        !valores.identidade) {
        return res.status(400).json({ message: "Preencha pelo menos um campo para atualizar!" })
    }

    try {
        const dados = await usuarioService.atualizar(id, valores)
        return res.status(200).json(dados)
    } catch (err) {
        console.error("Erro ao atualizar usuário!", err)
        return res.status(500).json({ message: err.message })
    }
}

async function apagar(req, res) {
    const id = req.user.id

    try {
        await usuarioService.apagar(id)
        return res.status(200).json({ message: "Usuário deletado com sucesso!" })
    } catch (err) {
        console.error("Erro ao deletar usuário!", err)
        return res.status(500).json({ message: "Erro ao deletar usuário!" })
    }
}

module.exports = { cadastrar, listar, atualizar, apagar, getUsuarioLogado }