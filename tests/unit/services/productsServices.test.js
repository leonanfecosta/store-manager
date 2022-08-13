const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsServices");

describe("productsService", () => {
  describe("getAllProducts", () => {
    afterEach(() => {
      Sinon.restore();
    });

    it("deve um array vazio", async () => {
      const resultExecute = [];
      Sinon.stub(productsModel, "getAllProducts").resolves(resultExecute);

      const result = await productsService.getAllProducts();
      expect(result).to.be.an("array");
    });

    it("deve retornar um array cheio", async () => {
      const resultExecute = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ];
      Sinon.stub(productsModel, "getAllProducts").resolves(resultExecute);
      const result = await productsService.getAllProducts();

      expect(result).to.be.not.empty;
    });

    it("deve retornar um array com os produtos cadastrados", async () => {
      const resultExecute = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ];
      Sinon.stub(productsModel, "getAllProducts").resolves(resultExecute);

      const result = await productsService.getAllProducts();

      expect(result).to.be.an("array");
      expect(result).to.have.lengthOf(3);
      expect(result[0]).to.all.keys("id", "name");
      expect(result[0].id).to.equal(1);
      expect(result[0].name).to.equal("Martelo de Thor");
    });
  });

  describe("getProductById", () => {
    afterEach(() => {
      Sinon.restore();
    }),
      it("deve retornar um objeto", async () => {
        const resultExecute = {
          id: 1,
          name: "Martelo de Thor",
        };
        Sinon.stub(productsModel, "getProductById").resolves(resultExecute);

        const result = await productsService.getProductById(1);
        expect(result).to.be.an("object");
      });

    it("deve retornar um objeto com os dados do produto", async () => {
      const resultExecute = {
        id: 1,
        name: "Martelo de Thor",
      };
      Sinon.stub(productsModel, "getProductById").resolves(resultExecute);

      const result = await productsService.getProductById(1);
      expect(result).to.be.an("object");
      expect(result).to.have.all.keys("id", "name");
      expect(result.id).to.equal(1);
      expect(result.name).to.equal("Martelo de Thor");
    });
  });
});
