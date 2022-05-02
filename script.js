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

function getSkuFromProductItem(item) {
  // caminho pra pegar codigo  (filho do item que seja span e tenha essa class)
  return item.querySelector('span.item__sku').innerText;
}

// Colocar do lado os items selecionados!! 
async function appendCart(produto) {
  // vai pegar as informacoes tudo 
  const botao = produto.target;
  // vai pegar o pai (section)) do botao e jogar na funcao
  const codigo = getSkuFromProductItem(botao.parentElement);
  const data = await fetchItem(codigo);
 const { id, title, price } = data;
  const salvar = document.querySelector('.cart__items')
 .appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
 saveCartItems(salvar.innerHTML);
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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// Vai pegar cada produto e jogar na tela!! 
async function appendProducts() {
  const products = await fetchProducts('computador');
  await products.forEach(({ id, title, thumbnail }) => {
    document.querySelector('.items')
    .appendChild(createProductItemElement({
       sku: id, name: title, image: thumbnail,
      }));
  });
}

window.onload = () => {
  appendProducts();
  // appendCart('MLB1341706310');
getSavedCartItems();
};
