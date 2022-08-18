const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const salesProductModel = require("../../../models/salesProductModel");
const connection = require("../../../models/connection");
const salesModel = require("../../../models/salesModel");

describe('salesModel', () => {
  afterEach(() => { 
    Sinon.restore();
  });
  it('deve retornar o numero do id', async () => { 
    Sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    const result = await salesModel.createSale();
    expect(result).to.be.an('number');
    expect(result).to.be.equal(1);
  });
});

describe('salesProductModel', () => { 
  afterEach(() => { 
    Sinon.restore();
  }
  );
  it('deve retornar true', async () => { 
    Sinon.stub(connection, "execute").resolves();
    const result = await salesProductModel.createSaleProduct(1, 1, 1);
    expect(result).to.be.true;
  }
  );

  describe('getAllSalesProducts', () => { 
    afterEach(() => { 
      Sinon.restore();
    });

    it('deve retornar um array com as vendas', async () => { 
      const sales = [{ saleId: 1, date: '2020-01-01', productId: 1, quantity: 1 }];
      Sinon.stub(connection, "execute").resolves([sales]);
      const result = await salesProductModel.getAllSalesProducts();
      expect(result).to.be.an('array');
      expect(result).to.be.equal(sales);

    });  
  });

  describe('getSalesProductsBySaleId', () => { 
    afterEach(() => { 
      Sinon.restore();
    });

    it('deve retornar um array com as vendas com id especifico', async () => { 
      const sales = [{ date: '2020-01-01', productId: 1, quantity: 1 }];
      Sinon.stub(connection, "execute").resolves([sales]);
      const result = await salesProductModel.getSalesProductsBySaleId(1);
      expect(result).to.be.an('array');
      expect(result).to.be.equal(sales);

    });
  });
});