const fetchProducts = async () => {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computadores');
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
