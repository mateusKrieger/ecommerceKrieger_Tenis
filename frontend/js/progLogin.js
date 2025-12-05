let btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    const dados = {
        email: email,
        senha: senha
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.json().then(body => {
            if (!resp.ok) throw new Error(body.message);
            return body;
        }))
        .then(dados => {
            console.log(dados)
            console.log('nome', dados.usuario.nome)
            console.log('tipo', dados.usuario.tipo)

            if (!dados.token) {
                res.innerHTML = dados.message || 'Erro ao fazer login!'
                res.style.color = 'red'
                res.style.textAlign = 'center'
                return
            }

            // Salvar token 
            sessionStorage.setItem('token', dados.token)
            // Salvar nome
            sessionStorage.setItem('nome', dados.usuario.nome)
            sessionStorage.setItem('tipo', dados.usuario.tipo)
            
            setTimeout(() => {
                // Redirecionar conforme tipo
                if (dados.usuario.tipo === 'ADMIN') {
                    location.href = './html/ADMIN.html'
                } else {
                    location.href = './html/loja.html'
                }
            }, 1000)
        })
        .catch((err) => {
            console.error('Falha ao fazer login!', err)
            alert(err.message)
        })
})