const { Router } = require('express');

const route = Router();

route.get('/', (_request, response) => { 
  response.json({ message: 'Hello World' });
});

route.get('/:id', (_request, response) => { 
  response.json({ message: 'Hello World com ID' });
});

module.exports = route;