import { useState, useEffect } from 'react'
import bookService from './services/books'

import BookData from './components/BookData'


function App() {
  const [books, setBooks] = useState([])

  const hookEffect = () => {
    bookService.getAllBooks()
      .then(response => {
        console.log('Response data:', response.data);
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  };


  useEffect(hookEffect, [])

  return (
    <>
      <h2>Books</h2>
      {Array.isArray(books) && books.length > 0 ? (
        books.map(book => <BookData key={book.id} book={book} />)
      ) : (
        <p>No books available</p>
      )}
    </>
  );

}

export default App
