const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

// In-memory storage for orders
let orders = [];

app.post('/submit-order', (req, res) => {
  const { name, table, items } = req.body;
  const order = {
    name,
    table,
    items,
    time: new Date().toLocaleTimeString()
  };
  orders.push(order);

  console.log(`New Order Received:
  Name: ${name}
  Table: ${table}
  Items: ${items.join(', ')}
  `);

  res.send(`✅ Thank you ${name}! Your order has been received for Table ${table}.`);
});

// Endpoint to get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
