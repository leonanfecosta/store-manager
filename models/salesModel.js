const connection = require('./connection');

const salesModel = {
  createSale: async () => {
    const query = 'INSERT INTO sales (date) VALUES (NOW())';
    const [result] = await connection.execute(query);
    return result.insertId;
  },
  deleteSaleProduct: async (id) => {
    const query = `
      DELETE FROM StoreManager.sales WHERE id = ?`;
    const [{ affectedRows }] = await connection.execute(query, [id]);
    return affectedRows;
  },
};

module.exports = salesModel;