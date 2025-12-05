let token = sessionStorage.getItem('token')
let nome = sessionStorage.getItem('nome')
let tipo = sessionStorage.getItem('tipo')

// Se não tiver token, redireciona para login
if (!token) {
    location.href = '../index.html'
}

// Se não for cliente, volta para admin
if (tipo !== 'CLIENTE') {
    location.href = './home.html'
}

let nomeUsuario = document.getElementById('nomeUsuario');
let btnLogout = document.getElementById('btnLogout');

if (nomeUsuario && nome) {
    nomeUsuario.textContent = nome
}

// Logout
btnLogout.addEventListener("click", (e) => {
    e.preventDefault()
    sessionStorage.clear()
    localStorage.clear()
    location.href = '../index.html'
})

//   PRODUTOS TEMPORÁRIOS

let produtos = []

fetch('http://localhost:3000/produto', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(resp => resp.json())
    .then(data => {
        produtos = data

        // depuração opcional:
        console.log('produtos recebidos:', produtos)

        data.forEach(prod => {
            // use prod.codProduto (ou o nome real do id vindo do backend)
            const id = prod.codProduto

            lista.innerHTML += `
            <article class="produto">
                <figure>
                    <img src="${prod.imagem_url}" alt="${prod.nome}">
                    <h2>${prod.nome}</h2>
                    <br>
                    <h3>R$ ${prod.preco || ''}</h3>
                    <br>
                    <p>${prod.descricao || ''}</p>
                </figure>
                <div class="controle-produto">
                    <br>
                    <input type="number" min="1" max="${prod.estoque}" value="1" id="qtd-${id}">
                    <br>
                    <button onclick="add(${id})">Adicionar ao carrinho</button>
                </div>
            </article>
        `
        })
    })

//   RENDERIZAÇÃO DOS CARDS

let lista = document.getElementById('listaProdutos');



//   ADICIONAR AO CARRINHO

function add(id) {
    // Obtém o campo de quantidade do produto pelo ID dinâmico
    const qtdInput = document.getElementById(`qtd-${id}`)
    const qtd = parseInt(qtdInput.value) || 1

    // Busca o produto pelo ID na lista carregada anteriormente
    const produto = produtos.find(p => p.codProduto === id)
    if (!produto) {
        alert('Produto não encontrado!')
        return
    }

    // Impede o usuário de adicionar produtos sem estoque
    if (produto.estoque <= 0) {
        alert('Este produto está sem estoque no momento!')
        return
    }

    // Garante que o usuário não solicite quantidade maior do que o estoque disponível
    if (qtd > produto.estoque) {
        alert(`Quantidade indisponível! Apenas ${produto.estoque} unidades em estoque.`)
        qtdInput.value = produto.estoque
        return
    }

    // Recupera o carrinho armazenado localmente (ou inicializa um novo caso não exista)
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

    // Verifica se o produto já existe no carrinho
    const itemExistente = carrinho.find(item => item.id === produto.codProduto)

    if (itemExistente) {
        // Se existir e a soma das quantidades ultrapassar o estoque, impede a adição
        if (itemExistente.qtd + qtd > produto.estoque) {
            alert(`Você já tem ${itemExistente.qtd} no carrinho.\nMáximo disponível: ${produto.estoque}.`)
            return
        }
        // Se estiver dentro do limite, apenas incrementa a quantidade
        itemExistente.qtd += qtd
    } else {
        // Caso seja a primeira vez adicionando o produto ao carrinho, cria o item
        carrinho.push({
            id: produto.codProduto,
            nome: produto.nome,
            qtd: qtd,
            preco: Number(produto.preco),
            imagem_url: produto.imagem_url
        })
    }

    // Atualiza o carrinho armazenado no navegador
    localStorage.setItem('carrinho', JSON.stringify(carrinho))

    // Redireciona para a página do carrinho após breve atraso visual
    setTimeout(() => {
        window.location = './carrinho.html'
    }, 1000)
}
