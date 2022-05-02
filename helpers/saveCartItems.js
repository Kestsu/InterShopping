const saveCartItems = (produto) => {
  // seu código aqui
localStorage.setItem('produtos', produto);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
