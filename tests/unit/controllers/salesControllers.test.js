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

    it("deve retornar status 404 e mensagem de erro quando o produto não existe", async () => {
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
      expect(response.json.calledWith({ message: "Product not found" })).to.be
        .true;
    });
  });

  describe("getAllSalesProducts", () => {
    afterEach(() => {
      Sinon.restore();
    });

    it("deve retornar status 200 e todos os produtos", async () => {
      const request = {};
      const response = {};
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const result = [
        {
          saleId: 1,
          date: "2022-08-17T21:42:53.000Z",
          productId: 1,
          quantity: 5,
        },
      ];

      Sinon.stub(salesProductsService, "getAllSalesProducts").resolves({
        data: result,
        code: 200,
      });

      await salesProductsController.getAllSalesProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(result)).to.be.true;
    });
  });

  describe("getSalesProductsBySaleId", () => {
    afterEach(() => {
      Sinon.restore();
    });

    it("deve retornar status 200 e o produto", async () => {
      const request = {};
      const response = {};
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      request.params = { id: 1 };
      const result = [
        {
          date: "2022-08-17T21:42:53.000Z",
          productId: 1,
          quantity: 5,
        },
      ];

      Sinon.stub(salesProductsService, "getSalesProductsBySaleId").resolves({
        data: result,
        code: 200,
      });

      await salesProductsController.getSalesProductsBySaleId(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(result)).to.be.true;
    });

    it("deve retornar status 404 e mensagem de erro quando o produto não existe", async () => { 
      afterEach(() => {
        Sinon.restore();
      });

      const request = {};
      const response = {};
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      request.params = { id: 1 };

      Sinon.stub(salesProductsService, "getSalesProductsBySaleId").resolves({
        code: 404,
        data: "Sale not found",
      });

      await salesProductsController.getSalesProductsBySaleId(request, response);
      expect(response.status.calledWith(404)).to.be.true;
      expect(response.json.calledWith({ message: "Sale not found" })).to.be
        .true;
    });
  });
});
