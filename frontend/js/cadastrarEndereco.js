const formEndereco = document.getElementById("formEndereco")
const inputCEP = document.getElementById("cep")

const idPedido = localStorage.getItem("idPedido")

let token = sessionStorage.getItem("token")
let nome = sessionStorage.getItem("nome")
let tipo = sessionStorage.getItem("tipo")

if (!token) {
  location.href = "../index.html"
}

if (tipo !== "CLIENTE") {
  location.href = "./home.html"
}

// ================= BUSCAR CEP =================

function buscarCEP() {
  const cep = inputCEP.value.replace(/\D/g, "")

  if (cep.length !== 8) {
    alert("CEP inválido!")
    return
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado!")
        return
      }

      document.getElementById("logradouro").value = data.logradouro
      document.getElementById("bairro").value = data.bairro
      document.getElementById("localidade").value = data.localidade
      document.getElementById("uf").value = data.uf
    })
    .catch(err => {
      console.error("Erro ao buscar CEP:", err)
      alert("Erro ao consultar o CEP")
    })
}

// ================= SUBMIT ENDEREÇO =================

formEndereco.addEventListener("submit", async (e) => {
  e.preventDefault()

  const dados = {
    idPedido: idPedido,
    cep: document.getElementById("cep").value,
    logradouro: document.getElementById("logradouro").value,
    numero: document.getElementById("numero").value,
    complemento: document.getElementById("complemento").value,
    bairro: document.getElementById("bairro").value,
    localidade: document.getElementById("localidade").value,
    uf: document.getElementById("uf").value
  }

  try {
    const resp = await fetch("http://localhost:3000/entrega", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(dados)
    })

    const resultado = await resp.json()

    // if (!resp.ok) {
    //   alert(resultado.message || "Erro ao salvar endereço")
    //   return
    // }

    alert("Obrigado pela compra!")
    window.location = "./loja.html"

  } catch (err) {
    console.error("ERRO NO ENVIO:", err)
    // alert("Erro ao cadastrar endereço!")
  }
})

// ================= EVENTO DO CEP =================

inputCEP.addEventListener("blur", buscarCEP)


