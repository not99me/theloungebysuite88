const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

// In-memory storage for orders
let orders = [];

app.post('/submit-order', (req, res) => {
  const { name, items, request } = req.body;
  const order = {
    name,
    items,
    request,
    time: new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })
  };
  orders.push(order);

  console.log(`New Order Received:
  Name: ${name}
  Items: ${items.join(', ')}
  Request: ${request}
  `);

  res.send(`✅ Thank you ${name}! Your order has been received.`);
});

// Endpoint to get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// ✅ New Endpoint to Remove an Order by Index
app.delete('/mark-done/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && orders[index]) {
    orders.splice(index, 1);
    res.send({ success: true });
  } else {
    res.status(400).send({ success: false, message: 'Order not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
