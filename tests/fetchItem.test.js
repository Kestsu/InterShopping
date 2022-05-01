require("../mocks/fetchSimulator");
const { fetchItem } = require("../helpers/fetchItem");
const item = require("../mocks/item");

describe("2 - Teste a função fecthItem", () => {
  // implemente seus testes aqui
  test("Teste se fetchItem é uma função", () => {
    expect(typeof fetchItem).toEqual("function");
  });

  test('a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
    expect(fetchItem("MLB1615760527")).not.toBe("undefined");
  });

  const fetchItemm = async () => {
    try {
      const allThings = await fetch(
        "https://api.mercadolibre.com/items/MLB1615760527"
      );
      const resultado = await allThings.json();
      return resultado;
    } catch (error) {
      return error;
    }
  };

  test('ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', async () => {
    expect(await fetchItem("MLB1615760527")).toBe(await fetchItemm());
  });

  test('se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect(await fetchItem("MLB1615760527")).toBe(item);
  });

  test("ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url", async () => {
    expect(await fetchItem()).toEqual(new Error("You must provide an url"));
  });
});
