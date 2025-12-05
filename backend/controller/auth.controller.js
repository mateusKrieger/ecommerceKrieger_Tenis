const authService = require('../service/auth.service')

async function login(req, res) {
    try {
        const { email, senha } = req.body

        
        const resultado = await authService.login({ email, senha })

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            ...resultado
        })

    } catch (err) {
        console.error('Erro no controller de login:', err.message)
        return res.status(400).json({ message: err.message })
    }

}

module.exports = { login }