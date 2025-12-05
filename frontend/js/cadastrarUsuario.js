let btnCadUsuario = document.getElementById('btnCadUsuario')

btnCadUsuario.addEventListener('click', (e) => {
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value
    let cpf = document.getElementById('cpf').value
    let identidade = document.getElementById('identidade').value
    let senha = document.getElementById('senha').value

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        identidade: identidade,
        senha: senha
    }

    fetch('http://localhost:3000/usuario/cadastrarCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(resp => {
            // Converte o corpo da resposta para JSON antes de qualquer validação
            return resp.json().then(body => {
                // Se a resposta não foi bem-sucedida (status fora do intervalo 200–299),
                // dispara um erro com a mensagem retornada pela API
                if (!resp.ok) throw new Error(body.message);

                // Se estiver tudo OK, retorna o objeto body para o próximo .then da cadeia
                return body;
            });
        })

        .then(dados => {

            setTimeout(() => {
                window.location = '../index.html'
            }, 2000)
        })
        .catch((err) => {
            console.error('Falha ao cadastrar usuário!', err)
            alert(err.message)
        })
})