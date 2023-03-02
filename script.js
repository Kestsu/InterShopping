const total_pay = document.querySelector(".total-pay");
const total = document.createElement("h3");
total.classList.add("total-price");
const carrinho = document.querySelector(".cart__items");
const esvaziar = document.querySelector(".empty-cart");
const inputSearch = document.querySelector(".search-input");
const btnSearch = document.querySelector(".btn-search");
const btnCelulares = document.querySelector(".btn-celular");
const btnBrinquedos = document.querySelector(".btn-brinquedos");
const btnBeleza = document.querySelector(".btn-beleza");
const btnRoupas = document.querySelector(".btn-roupas");
const btnCameras = document.querySelector(".btn-cameras");

// Vai colocar o carregando na tela
function carregando() {
  const li = document.createElement("h1");
  li.className = "loading";
  li.innerText = "carregando...";
  document.querySelector(".items").appendChild(li);
}
carregando();
// Vai remover o carregando
function removerCarregando() {
  document.querySelector(".items").innerHTML = " ";
}
// Vai somar os valores
function somaValores() {
  let soma = 0;
  const filhos = carrinho.children;
  for (let i = 0; i < filhos.length; i += 1) {
    const dados = filhos[i].innerText.split(": ")[1];
    const numero = parseFloat(dados);
    soma += numero;
  }
  return soma;
}

// Vai escrever no total!
function nota(valor) {
  total.innerText = `Total: ${valor.toFixed(2)}`;
  total_pay.appendChild(total);
}
// Vai apagar/Atualizar o localStorage/ Vai somar novamente!
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(carrinho.innerHTML);
  nota(somaValores());
}
// Vai criar a li do carrinho!!
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement("li");
  li.className = "cart__item";
  li.innerText = `${name} | Preço: ${salePrice}`;
  // Adicionei o click de romover
  li.addEventListener("click", cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  // caminho pra pegar codigo  (filho do item que seja span e tenha essa class)
  return item.querySelector("span.item__sku").innerText;
}

// Colocar do lado os items selecionados!!
async function appendCart(produto) {
  // vai pegar as informacoes tudo( vai pegar a tag )
  const botao = produto.target;
  // vai pegar o pai (section)) do botao (tag ) e jogar na funcao
  const idSku = getSkuFromProductItem(botao.parentElement);
  const data = await fetchItem(idSku);
  const { id, title, price } = data;
  document
    .querySelector(".cart__items")
    .appendChild(
      createCartItemElement({ sku: id, name: title, salePrice: price })
    );
  // Vai atualizar o localStorage
  saveCartItems(carrinho.innerHTML);
  // Vai atualizar o total
  nota(somaValores());
}

function createProductImageElement(imageSource) {
  const img = document.createElement("img");
  img.className = "item__image";
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === "button") e.addEventListener("click", appendCart);
  return e;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement("section");
  section.className = "item";

  section.appendChild(createCustomElement("span", "item__sku", sku));
  section.appendChild(createCustomElement("span", "item__title", name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement("p", "item__price", `Valor: ${price.toFixed(2)}`)
  );
  section.appendChild(
    createCustomElement("button", "item__add", "Adicionar ao carrinho!")
  );

  return section;
}

async function searchProduct(value) {
  if (!value) {
    const products = await fetchProducts("Computador");
    return products;
  }
  const products = await fetchProducts(value);
  return products;
}

// Vai jogar na tela !!
async function showProduct(products) {
  removerCarregando();
  await products.forEach(({ id, title, thumbnail, price }) => {
    document.querySelector(".items").appendChild(
      createProductItemElement({
        sku: id,
        name: title,
        image: thumbnail,
        price,
      })
    );
  });
}

// Vai selecionar o tipo que foi acionado e preparar o produto
async function appendProducts(value) {
  if (!value) {
    const inputValue = inputSearch.value;
    const products = await searchProduct(inputValue);
    showProduct(products);
  }
  if (value) {
    if (value.target.className === "btn-search") {
      const inputValue = inputSearch.value;
      const products = await searchProduct(inputValue);
      showProduct(products);
    }
    if (value.target.className.includes("btn-options")) {
      const inputValue = value.target.innerText;
      const products = await searchProduct(inputValue);
      showProduct(products);
    }
  }
}

// Vai limpar o carrinho quando apertar em esvaziar carrinho!!
function clear() {
  carrinho.innerHTML = " ";
  saveCartItems(carrinho.innerHTML);
  nota(somaValores());
}
esvaziar.addEventListener("click", clear);
btnSearch.addEventListener("click", appendProducts);
btnCelulares.addEventListener("click", appendProducts);
btnBrinquedos.addEventListener("click", appendProducts);
btnBeleza.addEventListener("click", appendProducts);
btnRoupas.addEventListener("click", appendProducts);
btnCameras.addEventListener("click", appendProducts);

window.onload = () => {
  // Vai colocar na tela os produtos
  appendProducts();
  // Vai trazer de volta o que esta no localStorage
  getSavedCartItems();
  // Vai adicionar de volta a possibilidade de apagar as coisas do carrinho
  document
    .querySelectorAll(".cart__item")
    .forEach((element) =>
      element.addEventListener("click", cartItemClickListener)
    );
  // Vai somar os valores novamente
  nota(somaValores());
};
