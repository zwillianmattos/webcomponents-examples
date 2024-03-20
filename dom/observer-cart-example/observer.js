class CarrinhoDeCompras {
  constructor() {
    this.itens = [];
    this.observers = [];
  }

  adicionarItem(item) {
    this.itens.push(item);
    this.notifyObservers();
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.atualizar(this.itens));
  }
}

class Totalizador {
  constructor(elemento) {
    this.elemento = elemento;
  }

  atualizar(itens) {
    const total = itens.reduce((acc, item) => acc + item.preco, 0);
    this.elemento.textContent = `Total do Carrinho: R$ ${total.toFixed(2)}`;
  }
}

class ListaItens {
  constructor(elemento) {
    this.elemento = elemento;
  }

  atualizar(itens) {
    this.elemento.innerHTML = '';
    itens.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('item');
      li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
      this.elemento.appendChild(li);
    });
  }
}

// Exemplo de uso
const carrinho = new CarrinhoDeCompras();
const totalizador = new Totalizador(document.getElementById('total'));
const listaItens = new ListaItens(document.getElementById('listaItens'));

carrinho.addObserver(totalizador);
carrinho.addObserver(listaItens);

document.getElementById('adicionarItem').addEventListener('click', () => {
  const novoItem = {
    nome: `Produto ${carrinho.itens.length + 1}`,
    preco: Math.random() * 100 // Preço aleatório entre 0 e 100
  };
  carrinho.adicionarItem(novoItem);
});