const getSavedCartItems = () => {
  // seu código aqui
const lis = localStorage.getItem('cartItems');
const lista = document.querySelector('.cart__items');
lista.innerHTML = lis;
// console.log('entrei no getSave');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
