const saveCartItems = (produto) => {
  // seu código aqui
localStorage.setItem('cartItems', produto);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
