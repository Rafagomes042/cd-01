function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const container = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total-carrinho");

  container.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalEl.textContent = "Total: R$ 0,00";
    return;
  }

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "item-carrinho";
    div.innerHTML = `
      <p><strong>${item.nome}</strong> (${item.codigo})</p>
      <p>Qtd: ${item.quantidade} - R$ ${subtotal.toFixed(2)}</p>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function enviarParaWhatsApp() {
  const nome = localStorage.getItem("nomeCliente") || "Cliente";
  const whatsapp = localStorage.getItem("whatsCliente") || "Não informado";
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = `*Orçamento - Casa do Dentista*%0A`;
  mensagem += `*Nome:* ${nome}%0A`;
  mensagem += `*WhatsApp:* ${whatsapp}%0A%0A`;

  let total = 0;
  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    mensagem += `*${item.codigo}* - ${item.nome} | Qtd: ${item.quantidade} | R$ ${subtotal.toFixed(2)}%0A`;
  });

  mensagem += `%0A*Total: R$ ${total.toFixed(2)}*`;

  const numeroLoja = "5511999999999"; // <- coloque aqui seu número com DDD
  const url = `https://wa.me/${numeroLoja}?text=${mensagem}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", carregarCarrinho);

