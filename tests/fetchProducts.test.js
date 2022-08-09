require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it("Testa se fetchProducts é uma função", () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it("Testa se, ao chamar a função fetchProducts com o argumento 'computador', a função fetch é chamada", async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it("Testa se, ao chamar a função fetchProducts com o argumento 'computador', a função fetch utiliza o endpoint esperado", async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it("Testa se o retorno da função fetchProducts com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch", async () => {
    expect.assertions(2);
    const response = await fetchProducts('computador');
    expect(typeof response).toBe(typeof computadorSearch);
    expect(response).toEqual(computadorSearch);
  });

  it("Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: 'You must provide an url'", async () => {
    expect.assertions(1);
    try{
      await fetchProducts();
    } catch(e){
      expect(e).toEqual(new Error('You must provide an url'));
    }
  });
});
