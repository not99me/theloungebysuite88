const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

app.post('/submit-order', (req, res) => {
  const { name, table, items } = req.body;
  console.log(`New Order Received:
  Name: ${name}
  Table: ${table}
  Items: ${items.join(', ')}
  `);

  res.send(`✅ Thank you ${name}! Your order has been received for Table ${table}.`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
