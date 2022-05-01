const fetchProducts = (a) => 
  // seu código
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${a}`)
  .then((primeiro) => primeiro.json())
  .then((segundo) => segundo.results)
  .catch((error) => error);
  
  // fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`)
  // try {
  //   const tudo = fetch("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  //   const primeiro = await tudo.json();
  //   const segundo = await primeiro.results;
  //   console.log(primeiro);
  // } catch (error) {
  //   console.log('nada');
  // }
// fetchProducts();
// console.log(fetchProducts('computador'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
