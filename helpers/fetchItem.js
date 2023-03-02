const fetchItem = (b) =>
  fetch(`https://api.mercadolibre.com/items/${b}`)
    .then((primeiro) => primeiro.json())
    .then((segundo) => segundo)
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
