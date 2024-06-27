const vlrTotal = parseFloat(prompt("Informe o valor total: "));

const calculaParcela = (vlr) => {
  let qtdParcela = parseInt(
    prompt("Informe a quantidade de parcelas desejadas para cáculo: ")
  );

  for (let i = 1; i <= qtdParcela; i++) {
    if (i === 1) {
      vlr = vlr / qtdParcela;
    }

    console.log(`O valor da ${i}a parcela é de R$ ${vlr.toFixed(2)}`);
  }
};

calculaParcela(vlrTotal);
