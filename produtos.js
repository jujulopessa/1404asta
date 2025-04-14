let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const cartItems = document.getElementById("cartItems");

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function renderCarrinho() {
  cartItems.innerHTML = "";

  if (carrinho.length === 0) {
    cartItems.innerHTML = "<p>O carrinho está vazio.</p>";
    return;
  }

  carrinho.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h4>${item.nome}</h4>
      <p>Quantidade: ${item.quantidade}</p>
    `;
    cartItems.appendChild(div);
  });
}

function adicionarAoCarrinho(id) {
  const nomeProduto = document.querySelector(`[data-id="${id}"]`).parentElement.querySelector("h3").innerText;
  
  const index = carrinho.findIndex(item => item.nome === nomeProduto);
  if (index >= 0) {
    carrinho[index].quantidade += 1;
  } else {
    carrinho.push({ nome: nomeProduto, quantidade: 1 });
  }

  salvarCarrinho();
  renderCarrinho();
}

// Adiciona evento de clique nos botões de adicionar ao carrinho
document.querySelectorAll('.product button').forEach(button => {
  button.addEventListener('click', () => {
    const id = parseInt(button.getAttribute('data-id'));
    adicionarAoCarrinho(id);
  });
});

renderCarrinho();