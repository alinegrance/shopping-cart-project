const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Testa se ao executar saveCartItems com o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado', () => {
    const item = '<ol><li>Item</li></ol>'
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Testa se ao executar saveCartItems com o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado com dois parâmetros: cartItems e valor ', () => {
    const item = '<ol><li>Item</li></ol>'
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', item);
  });
});
