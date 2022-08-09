require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Testa se fetch foi chamada quando fetchItem é invocada com "MLB1615760527"', async () => {
    
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se, ao chamar a função fetchItems com o argumento "computador", a função fetch utiliza o endpoint esperado', async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Testa se o retorno da funçao fetchItem com argumento "MLB1615760527" é uma estrurura de dados igual ao objeto item', async () => {
    
    const response = await fetchItem('MLB1615760527');
    // expect(typeof response).toBe(typeof item);
    expect(response).toEqual(item);
  });

  it('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
   
    try{
      await fetchItem();
    } catch(e) {
      expect(e).toEqual(new Error('You must provide an url'));
    }
  });
});
