const getSavedCartItems = () => {
  // seu código aqui
const lis = localStorage.getItem('produtos');
const lista = document.querySelector('.cart__items');
lista.innerHTML = lis;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
