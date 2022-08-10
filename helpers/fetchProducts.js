function later(delay) {
  return new Promise((resolve) => {
      setTimeout(resolve, delay);
  });
}

const fetchProducts = async (item) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
  const data = await response.json();
  // await later(2000);
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
