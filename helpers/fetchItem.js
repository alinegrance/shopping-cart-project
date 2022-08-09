const fetchItem = async (itemID) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${itemID}`);
  const item = response.json();
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
