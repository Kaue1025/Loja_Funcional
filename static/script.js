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




