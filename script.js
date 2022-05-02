const carrinho = document.querySelector('.cart__items');
function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  // console.log(event.target);
  // localStorage.removeItem('produtos');
  saveCartItems(carrinho.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // document.querySelectorAll('.cart__item').addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  // caminho pra pegar codigo  (filho do item que seja span e tenha essa class)
  return item.querySelector('span.item__sku').innerText;
}

// const somaValores = async () => {
// const valores = document.querySelectorAll('.cart__items');

// };

// Colocar do lado os items selecionados!!
async function appendCart(produto) {
  // vai pegar as informacoes tudo
  const botao = produto.target;
  // vai pegar o pai (section)) do botao e jogar na funcao
  const codigo = getSkuFromProductItem(botao.parentElement);
  const data = await fetchItem(codigo);
  const { id, title, price } = data;
  document
    .querySelector('.cart__items')
    .appendChild(
      createCartItemElement({ sku: id, name: title, salePrice: price }),
    );
  saveCartItems(carrinho.innerHTML);
  // somaValores();
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

// async function somaValores() {
// const produtos = document.querySelectorAll('.cart__item');

// }

window.onload = () => {
  appendProducts();
  // appendCart('MLB1341706310');
  getSavedCartItems();
  document
    .querySelectorAll('.cart__item')
    .forEach((element) =>
      element.addEventListener('click', cartItemClickListener));
};
