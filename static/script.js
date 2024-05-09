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


  document.addEventListener("DOMContentLoaded", function() {
    const inputPesquisa = document.getElementById("pesquisa");
    const produtosLista = document.querySelectorAll(".produtos .produto");
    const produtosContainer = document.querySelector('.produtos');
    let algumProdutoEncontrado = false; 
    let nenhumitempesquisado = true;
    inputPesquisa.addEventListener("input", function() {
        const termoPesquisa = inputPesquisa.value.trim().toLowerCase();
        produtosLista.forEach(function(produto) {
            const textoProduto = produto.textContent.toLowerCase();
            if (termoPesquisa === "" || textoProduto.includes(termoPesquisa)) {
                produto.style.display = "";
                algumProdutoEncontrado = true;
            } else {
                produto.style.display = "none";
            }
        });
        if (algumProdutoEncontrado) {
              produtosContainer.style.height = 'calc(100vh - 200px)'; // problema nesse filho de uma vadia
        } else{
          produtosContainer.style.height = '100%';
        }
    });

    
  });




