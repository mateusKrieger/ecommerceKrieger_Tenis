
function adicionarAoCarrinho(botao) {
    const card = botao.parentElement;

    const precoTexto = card.querySelector("p").innerText;

    const precoLimpo = Number(
        precoTexto.replace("R$","").replace(",",".").trim()
    );

    const produto = {
        img: card.querySelector("img").src,
        nome: card.querySelector("h3").innerText,
        preco: precoLimpo,   // AGORA É NÚMERO
        qtd: 1               // QUANTIDADE PADRÃO
    };

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Produto adicionado ao carrinho!");
}


// ---------- CARREGAR ITENS DO CARRINHO ----------
    function carregarCarrinho() {
        const lista = document.getElementById("lista-carrinho");
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        lista.innerHTML = "";

        if (carrinho.length === 0) {
            lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
            return;
        }

        carrinho.forEach((item, index) => {
            lista.innerHTML += `
                <div class="item-carrinho">
                    <img src="${item.img}" width="120">

                    <div class="info-carrinho">
                        <h3>${item.nome}</h3>
                        <p>Preço unitário: R$ ${item.preco}</p>

                        <label>Quantidade:</label>
                        <input type="number" min="1" value="${item.qtd}" 
                               onchange="atualizarQuantidade(${index}, this.value)" 
                               class="input-qtd">
                    </div>
                </div>
                <hr>
            `;
        });

        atualizarTotalGeral();
    }

    // ---------- ATUALIZAR QUANTIDADE ----------
    function atualizarQuantidade(index, novaQtd) {
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        carrinho[index].qtd = Number(novaQtd);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        // Atualiza total do item
        document.getElementById(`total-item-${index}`).innerText =
            "Total: R$ " + (carrinho[index].preco * carrinho[index].qtd).toFixed(2);

        // Atualiza total geral
        atualizarTotalGeral();
    }

    // ---------- TOTAL GERAL ----------
    function atualizarTotalGeral() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        let total = 0;

        carrinho.forEach(item => {
            total += item.preco * item.qtd;
        });

        document.getElementById("total-geral").innerText =
            "Total: R$ " + total.toFixed(2);
    }

    // ---------- LIMPAR CARRINHO ----------
    function limparCarrinho() {
        localStorage.removeItem("carrinho");
        location.reload();
    }

// ---------- FINALIZAR COMPRA ----------
    async function finalizarCompra() {

    // Limpa o carrinho do localStorage
    localStorage.removeItem("carrinho");

    // Redireciona para a página de entrega
    window.location.href = "./entrega.html";
}




    carregarCarrinho();
