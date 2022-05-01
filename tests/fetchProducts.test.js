require("../mocks/fetchSimulator");
const { fetchProducts } = require("../helpers/fetchProducts");
const computadorSearch = require("../mocks/search");

describe("1 - Teste a função fecthProducts", () => {
  // implemente seus testes aqui

  test("Se a fetchProducts é uma função", () => {
    expect(typeof fetchProducts).toBe("function");
  });

  test("Se a função fecth foi chamada", () => {
    expect(fetchProducts("computador")).not.toBe("undefined");
  });

  const teste = async () => {
    try {
      const tudo = await fetch(
        "https://api.mercadolibre.com/sites/MLB/search?q=computador"
      );
      const json = await tudo.json();
      const resultado = await json.results;
      return resultado;
    } catch (error) {
      return error;
    }
  };
  test('o chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', async () => {
    expect(await fetchProducts("computador")).toBe(await teste());
  });

  test('argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts("computador")).toBe(computadorSearch.results);
  });
  test("Verifica se retorna erro ao executar a função sem parâmetro", async () => {
    const failRequest = await fetchProducts();

    expect(failRequest).toEqual(new Error("You must provide an url"));
  });
});
