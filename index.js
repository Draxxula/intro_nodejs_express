const express = require('express');
const app = express();
const port = 3000;

//Serve static file from the "public" folder
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json()); 

// Define a route for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// New Route
app.get('/about', (req, res) => {
    res.send('About Us');
});

//POST Route
app.post('/submit', (req, res) => {
  const data = req.body;
  res.send(`Received: ${JSON.stringify(data)}`); 
});

const items = ['Apples', 'Banana', 'Orange'];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body.item;
  items.push(newItem);
  res.json(items);
});

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});