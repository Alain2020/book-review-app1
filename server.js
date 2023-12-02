const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON in the request body
app.use(express.json());

// Route to get the list of books
app.get('/books', async (req, res) => {
  try {
    console.log('Fetching list of books...');
    const response = await axios.get('https://simple-books-api.glitch.me/books');
    console.log('Response from external API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
  }
});

// Route to get a book by ISBN
app.get('/books/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    console.log('Fetching book for ISBN:', isbn);
    const response = await axios.get(`https://simple-books-api.glitch.me/books/${isbn}`);
    console.log('Response from external API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching book by ISBN:', error);
    res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
  }
});

// Route to get book reviews
app.get('/book-reviews/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  try {
    console.log('Fetching book reviews for book ID:', bookId);
    const response = await axios.get(`https://simple-books-api.glitch.me/orders/${bookId}`);
    console.log('Response from external API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching book reviews:', error);
    res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
  }
});

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Review Application!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
