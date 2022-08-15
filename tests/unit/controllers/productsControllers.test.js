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
      expect(
        response.json.calledWith({ message: "Product not found" })
      ).to.be.equal(true);
    });
  });

  describe("createProduct", () => {
    afterEach(() => {
      Sinon.restore();
    });

    it("retorna o produto com o status 201", async () => {
      const request = {};
      const response = {};

      request.body = { name: "ProdutoX" };
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      Sinon.stub(productsService, "createProduct").resolves({
        code: 201,
        data: { id: 1, name: "ProdutoX" },
      });

      await productsController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith({ id: 1, name: "ProdutoX" })).to.be.equal(
        true
      );
    });

    it("retorna erro 400 quando o nome do produto nao é passado", async () => {
      const request = {};
      const response = {};

      request.body = {};
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      Sinon.stub(productsService, "createProduct").resolves({
        code: 400,
        data: '"name" is required',
      });

      await productsController.createProduct(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
      expect(
        response.json.calledWith({ message: '"name" is required' })
      ).to.be.equal(true);
    });

    it("retorna erro 422 caso o produto tenha menos que 5 caracteres", async () => {
      const request = {};
      const response = {};

      request.body = { name: "Prod" };
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      Sinon.stub(productsService, "createProduct").resolves({
        code: 422,
        data: '"name" length must be at least 5 characters long',
      });

      await productsController.createProduct(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(
        response.json.calledWith({
          message: '"name" length must be at least 5 characters long',
        })
      ).to.be.equal(true);
    });
  });
});
