const fetchItem = (b) =>
  // seu código aqui
  fetch(`https://api.mercadolibre.com/items/${b}`)
    .then((primeiro) => primeiro.json())
    .then((segundo) => segundo)
    .catch((error) => error);

// console.log('ccccc', fetchItem('MLB1341706310'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
