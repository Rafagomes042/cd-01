document.addEventListener("DOMContentLoaded", () => {
  const cliente = JSON.parse(localStorage.getItem("cliente"));
  if (!cliente) {
    alert("Você precisa se cadastrar para acessar o site.");
    window.location.href = "cadastro.html"; // Redireciona para a página de cadastro
  } else {
    document.getElementById("nomeCliente").textContent = cliente.nome;
    exibirProdutos(produtos); // Chama a função para exibir os produtos
  }

  const inputBusca = document.getElementById("searchInput");
  if (inputBusca) {
    inputBusca.addEventListener("input", () => {
      const termo = inputBusca.value.toLowerCase();
      const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        p.codigo.toLowerCase().includes(termo)
      );
      exibirProdutos(filtrados);
    });
  }
});

function exibirProdutos(lista) {
  const container = document.getElementById("produtosContainer");
  container.innerHTML = ""; // Limpa o container

  lista.forEach(produto => {
    const card = document.createElement("div");
    card.className = "item-produto";
    card.innerHTML = `
      <img src="img/${produto.codigo}.jpg" class="img-produto" />
      <div class="info-produto">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
        <p class="codigo">Código: ${produto.codigo}</p>
        <div class="quantidade">
          <button onclick="alterarQtd(this, -1)" class="btn-quantidade">-</button>
          <span>1</span>
          <button onclick="alterarQtd(this, 1)" class="btn-quantidade">+</button>
        </div>
        <button class="btn" onclick="adicionarCarrinho('${produto.codigo}', this)">Adicionar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function adicionarCarrinho(codigo, botao) {
  const card = botao.closest(".item-produto");
  const qtd = parseInt(card.querySelector(".quantidade span").textContent);

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = carrinho.find(p => p.codigo === codigo);

  if (item) {
    item.quantidade += qtd;
  } else {
    carrinho.push({ codigo, quantidade: qtd });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Animação simples de feedback visual
  botao.classList.add("adicionado");
  botao.textContent = "Adicionado!";
  setTimeout(() => {
    botao.classList.remove("adicionado");
    botao.textContent = "Adicionar";
  }, 1000);
}

function alterarQtd(botao, delta) {
  const span = botao.parentElement.querySelector("span");
  let qtd = parseInt(span.textContent);
  qtd += delta;
  if (qtd < 1) qtd = 1;
  span.textContent = qtd;
}