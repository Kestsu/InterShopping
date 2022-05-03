const sectionCart = document.querySelector('.cart');
const total = document.createElement('h3');
const carrinho = document.querySelector('.cart__items');
const esvaziar = document.querySelector('.empty-cart');

// Vai colocar o carregando na tela
function carregando() {
  const li = document.createElement('h1');
  li.className = 'loading';
  li.innerText = 'carregando...';
  document.querySelector('.items').appendChild(li);
}
carregando();
// Vai remover o carregando
function removerCarregando() {
  document.querySelector('.items').innerHTML = ' ';
}
// Vai somar os valores
function somaValores() {
  let soma = 0;
  const filhos = carrinho.children;
  for (let i = 0; i < filhos.length; i += 1) {
    const dados = filhos[i].innerText.split('$')[1];
    const numero = parseFloat(dados);
    soma += numero;
  }
  return soma;
}

// Vai escrever no total!
function nota(valor) {
  total.innerText = valor;
  sectionCart.appendChild(total);
}
// Vai apagar/Atualizar o localStorage/ Vai somar novamente!
function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(carrinho.innerHTML);
  nota(somaValores());
}
// Vai criar a li do carrinho!!
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // Adicionei o click de romover
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  // caminho pra pegar codigo  (filho do item que seja span e tenha essa class)
  return item.querySelector('span.item__sku').innerText;
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
    .querySelector('.cart__items')
    .appendChild(
      createCartItemElement({ sku: id, name: title, salePrice: price }),
    );
  // Vai atualizar o localStorage
  saveCartItems(carrinho.innerHTML);
  // Vai atualizar o total
  nota(somaValores());
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') e.addEventListener('click', appendCart);
  return e;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('p', 'item__price', price));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

// Vai pegar cada produto e jogar na tela!!
async function appendProducts() {
  const products = await fetchProducts('computador');
  removerCarregando();
  await products.forEach(({ id, title, thumbnail, price }) => {
    document.querySelector('.items').appendChild(
      createProductItemElement({
        sku: id,
        name: title,
        image: thumbnail,
        price,
      }),
    );
  });
}
// Vai limpar o carrinho quando apertar em esvaziar carrinho!!
function clear() {
  carrinho.innerHTML = ' ';
  saveCartItems(carrinho.innerHTML);
  nota(somaValores());
}
esvaziar.addEventListener('click', clear);

window.onload = () => {
  // Vai colocar na tela os produtos
  appendProducts();
  // appendCart('MLB1341706310');
  // Vai trazer de volta o que esta no localStorage
  getSavedCartItems();
  // Vai adicionar de volta a possibilidade de apagar as coisas do carrinho
  document
    .querySelectorAll('.cart__item')
    .forEach((element) =>
      element.addEventListener('click', cartItemClickListener));
  // Vai somar os valores novamente
total.classList.add('total-price');
  nota(somaValores());
};
