const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se, ao executar getSavedCartItems, o metodo localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Testa se, ao executar getSavedCartItems, o metodo localStorage.getItem é chamado com cartItems como parâmetro', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
