const { expect } = require("chai");
const { describe, afterEach } = require("mocha");
const Sinon = require("sinon");

const productsModel = require("../../../models/productsModel");
const salesProductsService = require("../../../services/salesProductsService");
const salesProductModel = require("../../../models/salesProductModel");
const salesModel = require("../../../models/salesModel");

describe("salesProductsService", () => {
  describe("createSaleProduct", () => {
    afterEach(() => {
      Sinon.restore();
    });

    it("deve retornar um objeto com data e code", async () => {
      const sales = [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 10 },
      ];
      Sinon.stub(salesModel, "createSale").resolves(8);
      Sinon.stub(salesProductModel, "createSaleProduct").resolves(true);
      const result = await salesProductsService.createSaleProduct(sales);
      expect(result).to.be.an("object");
      expect(result).to.all.keys("data", "code");
      expect(result.data).to.be.an("object");
      expect(result.code).to.be.a("number");
      expect(result.data).to.all.keys("id", "itemsSold");
      expect(result.data.id).to.be.a("number");
      expect(result.data.itemsSold).to.be.an("array");
      expect(result.data.itemsSold[0]).to.be.an("object");
      expect(result.data.itemsSold[0]).to.all.keys("productId", "quantity");
      expect(result.data.itemsSold[0].productId).to.be.a("number");
      expect(result.data.itemsSold[0].quantity).to.be.a("number");
      expect(result.code).to.be.equal(201);
    });

    it("deve retornar code 400 se o id do produto nao for passado", async () => {
      afterEach(() => {
        Sinon.restore();
      });

      const sales = [{ quantity: 5 }];
      const result = await salesProductsService.createSaleProduct(sales);
      expect(result).to.be.an("object");
      expect(result).to.all.keys("data", "code");
      expect(result.data).to.be.equal('"productId" is required');
      expect(result.code).to.be.equal(400);
    });

    it("deve retornar code 400 se a quantidade nao for passada", async () => { 
      afterEach(() => {
        Sinon.restore();
      });

      const sales = [{ productId: 1 }];
      const result = await salesProductsService.createSaleProduct(sales);
      expect(result).to.be.an("object");
      expect(result).to.all.keys("data", "code");
      expect(result.data).to.be.equal('"quantity" is required');
      expect(result.code).to.be.equal(400);
    });

    it("deve retornar code 422 se a quantidade for menor que 1", async () => {
      afterEach(() => {
        Sinon.restore();
      });

      const sales = [{ productId: 1, quantity: 0 }];
      const result = await salesProductsService.createSaleProduct(sales);
      expect(result).to.be.an("object");
      expect(result).to.all.keys("data", "code");
      expect(result.data).to.be.equal('"quantity" must be greater than or equal to 1');
      expect(result.code).to.be.equal(422);
    });
    
    it("retorna erro 404 se o produto nao existir", async () => { 
      afterEach(() => {
        Sinon.restore();
      });

      const sales = [{ productId: 1, quantity: 5 }];
      Sinon.stub(productsModel, "getProductById").resolves(undefined);
      const result = await salesProductsService.createSaleProduct(sales);
      expect(result).to.be.an("object");
      expect(result).to.all.keys("data", "code");
      expect(result.data).to.be.equal("Product not found");
      expect(result.code).to.be.equal(404);
    });
  });

  describe("getAllSalesProducts", () => { 
    afterEach(() => { 
      Sinon.restore();
    });

    it("deve retornar um objeto com data e code 200", async () => {
      const sales = [{ date: "2020-01-01", productId: 1, quantity: 1 }];
      Sinon.stub(salesProductModel, "getAllSalesProducts").resolves(sales);
      const result = await salesProductsService.getAllSalesProducts();
      expect(result).to.be.an("object");
      expect(result).to.all.keys("data", "code");
      expect(result.data).to.be.an("array");
      expect(result.data[0]).to.be.an("object");
      expect(result.data[0]).to.all.keys("date", "productId", "quantity");
      expect(result.data[0].date).to.be.a("string");
      expect(result.data[0].productId).to.be.a("number");
      expect(result.data[0].quantity).to.be.a("number");
      expect(result.code).to.be.equal(200);
    });
  });

  describe("getSalesProductsBySaleId", () => { 
    afterEach(() => { 
      Sinon.restore();
    });

    it("deve retornar um objeto com data e code 200", async () => { 
      const sales = [{ date: "2020-01-01", productId: 1, quantity: 1 }];
      Sinon.stub(salesProductModel, "getSalesProductsBySaleId").resolves(sales);
      const result = await salesProductsService.getSalesProductsBySaleId(1);
      expect(result).to.be.an("object");
      expect(result).to.all.keys("data", "code");
      expect(result.data).to.be.an("array");
      expect(result.data[0]).to.be.an("object");
      expect(result.data[0]).to.all.keys("date", "productId", "quantity");
      expect(result.data[0].date).to.be.a("string");
      expect(result.data[0].productId).to.be.a("number");
      expect(result.data[0].quantity).to.be.a("number");
      expect(result.code).to.be.equal(200);
    });

    it("deve retornar code 404 se a venda nao existir", async () => { 
      Sinon.stub(salesProductModel, "getSalesProductsBySaleId").resolves(undefined);
      const result = await salesProductsService.getSalesProductsBySaleId(1);
      expect(result).to.be.an("object");
      expect(result).to.all.keys("data", "code");
      expect(result.data).to.be.equal("Sale not found");
      expect(result.code).to.be.equal(404);
    });
  });
});
