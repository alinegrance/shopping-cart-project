const getSavedCartItems = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
