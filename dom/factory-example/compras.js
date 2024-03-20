// Factory para criar objetos do tipo 'Produto'
const criarProduto = (nome, preco) => {
  return {
    nome,
    preco,
    desconto: 0,
    aplicarDesconto(percentual) {
      this.desconto = percentual;
      this.preco = this.preco * (1 - percentual / 100);
    }
  };
};

// Factory para criar objetos do tipo 'Cliente'
const criarCliente = (nome, email) => {
  return {
    nome,
    email,
    compras: [],
    fazerCompra(produto) {
      this.compras.push(produto);
      console.log(`Produto ${produto.nome} comprado por ${this.nome}.`);
      this._enviaEmail();
    },
    _enviaEmail() {
      this.email = "";
    },
  };
};

// Exemplo de utilização das factories
const meuProduto = criarProduto('Smartphone', 1500);
console.log(meuProduto); // Saída: { nome: 'Smartphone', preco: 1500, desconto: 0, aplicarDesconto: [Function: aplicarDesconto] }

const meuCliente = criarCliente('João', 'joao@example.com');
console.log(meuCliente); // Saída: { nome: 'João', email: 'joao@example.com', compras: [], fazerCompra: [Function: fazerCompra] }

meuCliente.fazerCompra(meuProduto);
console.log(meuCliente.compras); // Saída: [ { nome: 'Smartphone', preco: 1500, desconto: 0, aplicarDesconto: [Function: aplicarDesconto] } ]

meuProduto.aplicarDesconto(10);
console.log(meuProduto.preco); // Saída: 1350

meuCliente.fazerCompra(meuProduto);
console.log(meuCliente.compras); // Saída: [ { nome: 'Smartphone', preco: 1500, desconto: 0, aplicarDesconto: [Function: aplicarDesconto] }, { nome: 'Smartphone', preco: 1350, desconto: 10, aplicarDesconto: [Function: aplicarDesconto] } ]