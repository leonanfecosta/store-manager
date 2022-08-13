const { expect } = require("chai");
const { describe, afterEach } = require("mocha");
const Sinon = require("sinon");

const productsController = require("../../../controllers/productsController");
const productsService = require("../../../services/productsServices");

describe("productsControllers", () => {
  describe("getAllProducts", () => {
    afterEach(() => {
      Sinon.restore();
    });

    it("retorna todos os produtos com o status 200", async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      const products = [
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
      Sinon.stub(productsService, "getAllProducts").resolves(products);

      await productsController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(products)).to.be.equal(true);
    });
  });

  describe("getProductById", () => {
    afterEach(() => {
      Sinon.restore();
    });

    it("retorna o produto com o status 200", async () => {
      const request = {};
      const response = {};

      request.params = { id: 1 };
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      const product = {
        id: 1,
        name: "Martelo de Thor",
      };
      Sinon.stub(productsService, "getProductById").resolves(product);

      await productsController.getProductById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(product)).to.be.equal(true);
    });

    it("retorna o produto com o status 404", async () => {
      const request = {};
      const response = {};

      request.params = { id: 5 };
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      Sinon.stub(productsService, "getProductById").resolves(null);

      await productsController.getProductById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: "Product not found" })).to.be.equal(true);
    });
  });
});
