const connection = require('./connection');

const productsModel = {
  getAllProducts: async () => {
    const [products] = await connection.execute(
      'SELECT * FROM StoreManager.products',
    );
    return products;
  },

  getProductById: async (id) => {
    const [product] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [id],
    );
    return product[0];
  },

  createProduct: async (name) => {
    const [result] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUES (?)',
      [name],
    );
    return { id: result.insertId, name };
  },

  updateProduct: async (id, name) => {
    const [{ affectedRows }] = await connection.execute(
      'UPDATE StoreManager.products SET name = ? WHERE id = ?',
      [name, id],
    );
    return affectedRows;
  },

  deleteProduct: async (id) => { 
    const [{ affectedRows }] = await connection.execute(
      'DELETE FROM StoreManager.products WHERE id = ?',
      [id],
    );
    return affectedRows;
  },

  searchProduct: async (name) => { 
    const [products] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE name LIKE ?',
      [`%${name}%`],
    );
    console.log(products);
    return products;
  },
};

module.exports = productsModel;