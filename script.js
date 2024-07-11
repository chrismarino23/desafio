var catalogo = [];
var lastAdded = "";
class Produto {
  constructor(nome, cor, preco, quantidade) {
    this.nome = nome;
    this.cor = cor.toLowerCase();
    this.preco = parseFloat(preco).toFixed(2);
    this.quantidade = parseInt(quantidade);
  }
  descricao = () => {
    let buscaNome = catalogo.findIndex((produto) => produto.nome === lastAdded);

    if (buscaNome !== -1) {
      alert(`Modelo do produto: ${catalogo[buscaNome].nome}`);
    } else {
      console.log("Produto não encontrado no catálogo.");
    }
  };

  trataLetras = () => {
    console.log(this.nome.length);
    console.log(this.preco);
    console.log(this.cor.toLowerCase());
  };
}

catalogo.push(new Produto("Notebook Thinkpad", "Preto", "1.200,00", "2"));
lastAdded = "Notebook Thinkpad";

document.getElementById("infoProd").addEventListener("click", () => {
  catalogo[0].descricao();
});

document.getElementById("visuProdutos").addEventListener("click", () => {
  catalogo.forEach((produto, index) => {
    console.log(`Produto ${index + 1}:`);
    console.log(`Modelo ${produto.nome}:`);
    console.log(`cor: ${produto.cor}`);
    console.log(`preco: R$${produto.preco}`);
    console.log(`quantidade: ${produto.quantidade}`);
  });
});

document.getElementById("adcProduto").addEventListener("click", () => {
  let nomeProduto = prompt("Informe o nome: ");
  let temcor = prompt("Cor");
  let tempreco = prompt("Preço");
  let tamquantidade = prompt("Quantidade:");
  lastAdded = nomeProduto;
  let produto = new Produto(nomeProduto, temcor, tempreco, tamquantidade);
  catalogo.push(produto);
});
