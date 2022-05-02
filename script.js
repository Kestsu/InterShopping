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
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

async function appendProducts() {
  const products = await fetchProducts('computador');
  await products.forEach(({ id, title, thumbnail }) => {
    document.querySelector('.items')
    .appendChild(createProductItemElement({
       sku: id, name: title, image: thumbnail,
      }));
  });
}
// const fetchProducts = (a) => {
//   fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${a}`)
//   .then((primeiro) => primeiro.json())
//   .then((segundo) => segundo.results)
//   .catch((error) => error);
// };

// async function appendProducts() {
//   await fetchProducts('computador')
//    .then((response) => response.forEach(({ id, title, thumbnail }) => {
//      document.querySelector('.items')
//      .appendChild(createProductItemElement({
//         sku: id, name: title, image: thumbnail,
//        }));
//    }))
//    .catch((error) => error);
//  }

// Vai pegar cada produto e jogar na tela!! 
 
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
event.target.remove();
// console.log(event.target);
localStorage.removeItem('produtos');
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// Colocar do lado os items selecionados!! 
async function appendCart(produto) {
  const data = await fetchItem(produto);
 const { id, title, price } = data;
  const salvar = document.querySelector('.cart__items')
 .appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
 saveCartItems(salvar.innerHTML);
}

window.onload = () => {
  appendProducts();
  appendCart('MLB1341706310');
getSavedCartItems();
};
