function toggleMenu() {
  // Seleciona o menu lateral
  const menuLateral = document.getElementById('menu-lateral');

  // Verifica se o menu está visível
  if (menuLateral.classList.contains('aberto')) {
    // Se estiver visível, remove a classe 'aberto' para fechar o menu
    menuLateral.classList.remove('aberto');
  } else {
    // Se estiver invisível, adiciona a classe 'aberto' para abrir o menu
    menuLateral.classList.add('aberto');
  }
}

  function toggleCarrinho() {
    const carrinho = document.querySelector('.carrinho');
  
    // Verifica se o carrinho está visível
    if (carrinho.classList.contains('aberto')) {
      // Se estiver visível, remove a classe 'aberto' para fechar o carrinho
      carrinho.classList.remove('aberto');
    } else {
      // Se estiver invisível, adiciona a classe 'aberto' para abrir o carrinho
      carrinho.classList.add('aberto');
    }
}


let cart = [];
let total = 0;

function adicionarCarrinho(imagem, nomeProduto, preco) {
  const item = { imagem: imagem, nome: nomeProduto, preco: parseFloat(preco) };
  cart.push(item);
  renderizarCarrinho();
}

function renderizarCarrinho() {
  const carrinho = document.querySelector('.carrinho ul');
  carrinho.innerHTML = '';
  total = 0;

  cart.forEach((item, index) => {
    const listItem = document.createElement('li');

    const imagemProduto = document.createElement('img');
    imagemProduto.src = item.imagem;
    imagemProduto.alt = item.nome;
    listItem.appendChild(imagemProduto);

    const infoProduto = document.createElement('div');
    infoProduto.textContent = `${item.nome} - $${item.preco.toFixed(2)}`;
    listItem.appendChild(infoProduto);

    const removerBotao = document.createElement('button');
    removerBotao.textContent = 'Remover';
    removerBotao.addEventListener('click', () => removerItemCarrinho(index));
    listItem.appendChild(removerBotao);

    total += item.preco;
    carrinho.appendChild(listItem);
  });

  // Exibe o valor total
  const totalElement = document.createElement('div');
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
  carrinho.appendChild(totalElement);
}

function removerItemCarrinho(index) {
  cart.splice(index, 1);
  renderizarCarrinho();
}

const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
botoesAdicionar.forEach(botao => {
  botao.addEventListener('click', () => {
    const produtoElemento = botao.parentElement;
    const produtoImagem = produtoElemento.querySelector('img').getAttribute('src');
    const produtoNome = produtoElemento.querySelector('p').textContent;
    const preco = produtoElemento.querySelector('span').textContent;
    const precoNumerico = parseFloat(preco.replace('$', ''));
    adicionarCarrinho(produtoImagem, produtoNome, precoNumerico);
  });
});



