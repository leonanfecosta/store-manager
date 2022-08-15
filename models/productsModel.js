const connection = require('./connection');

const productsModel = {
  getAllProducts: async () => {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products');
    return products;
  },

  getProductById: async (id) => {
    const [product] = await connection
      .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
    return product[0];
  },

  createProduct: async (name) => {
    const [result] = await connection
      .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
  },

};

module.exports = productsModel;