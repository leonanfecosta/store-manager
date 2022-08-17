const connection = require('./connection');

const salesModel = {
  createSale: async () => {
    const query = 'INSERT INTO sales (date) VALUES (NOW())';
    const [result] = await connection.execute(query);
    return result.insertId;
  },
};

module.exports = salesModel;