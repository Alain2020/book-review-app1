// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Route to get the list of books
app.get('/books', async (req, res) => {
  try {
    const response = await axios.get('https://simple-books-api.glitch.me/books');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get books based on ISBN
app.get('/books/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`https://simple-books-api.glitch.me/books/${isbn}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get book reviews (adapted from the Simple Books API)
app.get('/book-reviews/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const response = await axios.get(`https://simple-books-api.glitch.me/orders/${bookId}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Review Application!');
});

// Routes for authentication and book review CRUD operations...

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});