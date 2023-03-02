const getSavedCartItems = () => {
const lis = localStorage.getItem('cartItems');
const lista = document.querySelector('.cart__items');
lista.innerHTML = lis;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
