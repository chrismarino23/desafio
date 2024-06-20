/*
Inserir preço de custo 
Somar ICMS
Mostrar preço calculado

Deve ser inserido pelo user e saído em alert
*/
// const taxa = 0.15;

const calcTaxa = (v) => {
  return (v * taxa) / 100;
};

const fgtsFinal = (v) => {
  return v - calcTaxa(v);
};

alert(
  "Bem vindo ao saque empréstimo FGTS!\nPara saber quanto você pode sacar e qual a taxa calculada encima do valor total, por favor clique em OK e siga os passos seguintes!"
);

const vlrFGTS = parseFloat(prompt("Insira o valor do seu FGTS total: "));

const taxa = parseInt(prompt("Informe a porcentagem da taxa do Banco: "));

const informaUser = () => {
  alert(
    `O seu FGTS Bruto é de R$ ${vlrFGTS}\nA taxa para esse cálculo será de: R$ ${calcTaxa(
      vlrFGTS
    )}\nE o FGTS líquido disponível para saque será de: R$ ${fgtsFinal(
      vlrFGTS
    )}`
  );
};

informaUser();
