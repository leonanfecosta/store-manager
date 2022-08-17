const connection = require('./connection');

const salesProductModel = {
  createSaleProduct: async (id, productId, quantity) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, productId, quantity],
    );
    return true;
  },

  getAllSalesProducts: async () => { 
    const query = `
      SELECT sale_id as saleId, date, product_id as productId, quantity
      FROM StoreManager.sales_products as sp
      JOIN StoreManager.sales as s on sp.sale_id = s.id
      ORDER BY saleId, productId`;
    const [sales] = await connection.execute(query);
    return sales;
  },

  getSalesProductsBySaleId: async (id) => { 
    const query = `
      SELECT 'date', product_id as productId, quantity
      FROM StoreManager.sales_products as sp
      JOIN StoreManager.sales as s on sp.sale_id = s.id
      WHERE sp.sale_id = ?`;
    const [sales] = await connection.execute(query, [id]);
    return sales;
  },
};

module.exports = salesProductModel;