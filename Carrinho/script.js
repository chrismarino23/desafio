document.addEventListener("DOMContentLoaded", function () {
  // myModalTest.style.display = "none";

  const produtos = [
    {
      id: 1,
      url: "./img/2024-06-02_19h48_27.png",
      name: "Donuts no Palito",
      price: "5,00",
    },
    {
      id: 2,
      url: "./img/2024-06-02_19h50_16.png",
      name: "Donuts Variados",
      price: "7,00",
    },
    {
      id: 3,
      url: "./img/2024-06-02_19h51_13.png",
      name: "Torta de Limão",
      price: "10,00",
    },
    {
      id: 4,
      url: "./img/2024-06-02_19h51_29.png",
      name: "Torta de Frango",
      price: "10,00",
    },
  ];

  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    wrapper.classList.add("wrapper_class");

    alertPlaceholder.append(wrapper);
  };

  const list = document.getElementById("product_list");
  const carrinho = [];

  produtos.forEach((element) => {
    list.innerHTML += `<li class="li_list">
                        <div class="div_img">
                            <img class="img_product" src="${element.url}" alt="Produto">
                        </div>
                        <div class="div_body">
                            <h3 class="product_name">${element.name}</h3>
                            <span class="span_product">
                                Preço 
                                <strong>
                                  <p class="p_price"> R$ ${element.price}</p>
                                </strong>
                            </span>
                        </div>
                <div class="div_footer_product">
                    <button id="liveAlertBtn" class="btn_Produto" data-id="${element.id}">Quero esse!</button>
                </div>
                    </li>`;
  });

  const btnAddtoCart = document.querySelectorAll(".btn_Produto");
  const myModalTest = document.getElementById("myModalTest");
  const dissmissModal1 = document.getElementById("dissmissModal1");
  const dissmissModal2 = document.getElementById("dissmissModal2");

  function validaModal(entrada) {
    entrada.onclick = () => {
      myModalTest.style.display =
        myModalTest.style.display === "block" ? "none" : "block";
    };
  }

  btnAddtoCart.forEach((btnClicked) => {
    btnClicked.onclick = () => {
      const delay = 1000;
      const productId = parseInt(btnClicked.getAttribute("data-id"));
      const produto = produtos.find((p) => p.id === productId);

      if (produto) {
        const produtoNoCarrinho = carrinho.find(
          (item) => item.id === productId
        );

        if (produtoNoCarrinho) {
          if (dissmissModal1) {
            validaModal(dissmissModal1);
          }

          if (dissmissModal2) {
            validaModal(dissmissModal2);
          }

          window.onclick = function (event) {
            if (event.target == myModalTest) {
              myModalTest.style.display = "none";
            }
          };
          alert("Este produto já está no carrinho.");
        } else {
          carrinho.push(produto);
          appendAlert("O Produto foi adicionado ao carrinho!", "success");

          wrapper = document.querySelectorAll(".wrapper_class");

          setTimeout(() => {
            if (wrapper) {
              wrapper.forEach((element) => {
                element.remove();
              });
            }
          }, delay);

          const licart = document.createElement("li");
          licart.classList.add("li_cart_list");

          licart.innerHTML = `<div class="div_img_cart">
            <img class="img_product" src="${produto.url}" alt="Produto ${produto.id}">
          </div>
          <div class="div_body">
            <h3 class="product_name">${produto.name}</h3>
            <span class="span_product">
                Preço:
                  <strong>
                    <p class="p_cart_price">R$ ${produto.price}</p>
                  </strong>
            </span>
          </div>
          <div class="div_cart_footer">
            <div class="qtd_input">
                <label class="lbl_input" for="input_produto">Quantidade</label>
                <div class="div_footer_product">
                    <button class="btn_Produto btn_Produto_remove">-</button>
                    <input class="input_produto input_produto_cart" type="text" value="1" name="input_produto" disabled>
                    <button class="btn_Produto btn_Produto_add">+</button>
                </div>
                <small class="message">Unidade(s)</small>
            </div>
          </div>
          <div class="div_removeBtn">
            <button class="btn_Produto color_red">Remover</button>
          </div>`;

          document.querySelector(".cart_list").appendChild(licart);
          carrinho.forEach((element) => {
            let json_carrinho = JSON.stringify(element);
            // console.log(json_carrinho);
            localStorage.setItem("carrinho", json_carrinho);
          });
          verifyCartWarn();

          // Adiciona os eventos para os botões dentro do item adicionado ao carrinho
          const btnAdd = licart.querySelector(".btn_Produto_add");
          const btnRemove = licart.querySelector(".btn_Produto_remove");
          const inputNumero = licart.querySelector(".input_produto_cart");
          const pCartPrice = licart.querySelector(".p_cart_price");

          btnAdd.onclick = () => {
            let qtd = parseInt(inputNumero.value) + 1;
            inputNumero.value = qtd;
            atualizarPreco(produto, qtd, pCartPrice);
          };

          btnRemove.onclick = () => {
            let qtd = parseInt(inputNumero.value);
            if (qtd > 1) {
              qtd--;
              inputNumero.value = qtd;
              atualizarPreco(produto, qtd, pCartPrice);
            }
          };

          const btnRemoveCart = licart.querySelector(".color_red");
          btnRemoveCart.onclick = () => {
            licart.remove();
            const index = carrinho.findIndex((item) => item.id === produto.id);
            if (index > -1) {
              carrinho.splice(index, 1);
            }
            closeCart();
            verifyCartWarn();
          };
        }
      }
    };

    const mostraCarrinho = document.getElementById("mostraCarrinho");
    mostraCarrinho.onclick = () => {
      carrinho == false ? alert("O carrinho está vazio!") : closeCart();
    };
  });

  function atualizarPreco(produto, qtd, pCartPrice) {
    const trataPrice = produto.price;
    const precoFormatado = parseFloat(trataPrice.replace(",", ".")).toFixed(2);
    const novoPreco = precoFormatado * qtd;
    pCartPrice.innerText = `R$ ${novoPreco.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  const closeCart = () => {
    if (carrinho.length < 1) {
      document.getElementById("div_carrinho").style.display = "none";
    } else {
      document.getElementById("div_carrinho").style.display = "block";
    }
  };

  function verifyCartWarn() {
    carrinho.length >= 1
      ? (warning_cart = document.getElementById("warning_cart").style.display =
          "block")
      : (warning_cart = document.getElementById("warning_cart").style.display =
          "none");
  }
});
