const { expect } = require("chai");
const { describe, afterEach } = require("mocha");
const Sinon = require("sinon");

const salesProductsService = require("../../../services/salesProductsService");
const salesProductsController = require("../../../controllers/salesProductsController");

describe("salesProductsController", () => {
  describe("createSaleProduct", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("deve retornar status 200 e o objeto com id e itemsSold", async () => {
      const request = {};
      const response = {};
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const sales = [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 10 },
      ];

      request.body = sales;

      Sinon.stub(salesProductsService, "createSaleProduct").resolves({
        data: { id: 5, itemsSold: sales },
        code: 201,
      });

      await salesProductsController.createSaleProduct(request, response);
      expect(response.status.calledWith(201)).to.be.true;
      expect(response.json.calledWith({ id: 5, itemsSold: sales })).to.be.true;
    });

    it("deve retornar status 400 e mensagem de erro", async () => {
      afterEach(() => {
        Sinon.restore();
      });

      const request = {};
      const response = {};
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const sales = [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 10 },
      ];

      request.body = sales;

      Sinon.stub(salesProductsService, "createSaleProduct").resolves({
        data: '"productId" is required',
        code: 400,
      });

      await salesProductsController.createSaleProduct(request, response);
      expect(response.status.calledWith(400)).to.be.true;
      expect(response.json.calledWith({ message: '"productId" is required' }))
        .to.be.true;
    });

    it("deve retornar status 422 e mensagem de erro", async () => {
      afterEach(() => {
        Sinon.restore();
      });

      const request = {};
      const response = {};
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const sales = [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 10 },
      ];

      request.body = sales;

      Sinon.stub(salesProductsService, "createSaleProduct").resolves({
        data: '"quantity" must be greater than or equal to 1',
        code: 422,
      });

      await salesProductsController.createSaleProduct(request, response);
      expect(response.status.calledWith(422)).to.be.true;
      expect(
        response.json.calledWith({
          message: '"quantity" must be greater than or equal to 1',
        })
      ).to.be.true;
    });

    it('deve retornar status 404 e mensagem de erro quando o produto não existe', async () => { 
      afterEach(() => {
        Sinon.restore();
      });

      const request = {};
      const response = {};
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const sales = [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 10 },
      ];

      request.body = sales;

      Sinon.stub(salesProductsService, "createSaleProduct").resolves({
        code: 404,
        data: "Product not found",
      });

      await salesProductsController.createSaleProduct(request, response);
      expect(response.status.calledWith(404)).to.be.true;
      expect(response.json.calledWith({ message: "Product not found" })).to.be.true;
    });
  });
});
