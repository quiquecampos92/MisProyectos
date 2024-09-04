import { useState, useEffect } from 'react'
import bookService from './services/books'

// import BookData from './components/BookData'
import AddBook from './components/AddBook'
import FilterName from './components/FilterName'
import DataFilter from './components/DataFilter'
import UpdateBook from './components/UpdateBook'



function App() {
  const [books, setBooks] = useState([])
  const [newName, setNewName] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newPoints, setNewPoints] = useState('')
  const [newReview, setNewReview] = useState(null)
  const [newReading_Date, setNewReading_Date] = useState('')
  const [newOwner, setNewOwner] = useState('')
  const [newRead, setNewRead] = useState(false)
  const [newPrice, setNewPrice] = useState('')
  const [message, setMessage] = useState(null)
  const [isAddBookVisible, setIsAddBookVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('')




  const hookEffect = () => {
    bookService.getAllBooks()
      .then(response => {
        console.log('Response data:', response.data);
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setError('Error fetching books');
      });
  };


  useEffect(hookEffect, [])

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    setNewAuthor(event.target.value)
  }

  const handlePointsChange = (event) => {
    console.log(event.target.value);
    setNewPoints(event.target.value)
  }

  const handleReviewChange = (event) => {
    console.log(event.target.value);
    setNewReview(event.target.value)
  }

  const handleReading_DateChange = (event) => {
    console.log(event.target.value);
    setNewReading_Date(event.target.value)
  }

  const handleOwnerChange = (event) => {
    console.log(event.target.value);
    setNewOwner(event.target.value)
  }

  const handleReadChange = (event) => {
    console.log(event.target.checked);
    setNewRead(event.target.checked)
  }

  const handlePriceChange = (event) => {
    console.log(event.target.value);
    setNewPrice(event.target.value)
  }

  const handleDelete = (id) => {
    bookService.deleteBook(id)
      .then(() => {
        console.log('Book deleted');
        return bookService.getAllBooks();
      })
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        setError('Error eliminando books');
      });
  }

  const handleFilter = (event) => {
    const filter = event.target.value.toLowerCase();
    setSearchTerm(filter);
  }

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditing(true);
  };

  const addBook = (event) => {
    event.preventDefault()
    const checkedName = books.some(book => book.name.toLowerCase() === newName.toLowerCase());
    console.log(checkedName);
    if (!checkedName) {
      const bookObject = {
        name: newName,
        author: newAuthor,
        points: newPoints,
        review: newReview,
        reading_Date: newReading_Date,
        owner: newOwner,
        read: newRead,
        price: newPrice
      }
      bookService
        .createBook(bookObject)
        .then(response => {
          setBooks(books.concat(response.data))
          setIsAddBookVisible(false);
          setNewName('')
          setNewAuthor('')
          setNewPoints('')
          setNewReview('')
          setNewReading_Date('')
          setNewOwner('')
          setNewRead(false)
          setNewPrice('')
          setMessage(`Added book: ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error adding book:', error);
          setError('Error adding book');
        })
    } else {
      alert(`Book: ${newName} already exist`)
      setNewName('')
      setNewAuthor('')
      setNewPoints('')
      setNewReview('')
      setNewReading_Date('')
      setNewOwner('')
      setNewRead(false)
      setNewPrice('')
    }
  }

  const handleUpdateBook = (updatedBook) => {
    bookService.updateBook(updatedBook.id, updatedBook)
      .then(response => {
        setBooks(books.map(book => (book.id === updatedBook.id ? response.data : book)));
        setIsEditing(false);
        setSelectedBook(null);
      })
      .catch(error => {
        console.error('Error updating books:', error);
        setError('Error updating books');
      });
  };



  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Books</h2>
      <div>
        {!isAddBookVisible && (
          <button
            onClick={() => setIsAddBookVisible(!isAddBookVisible)}
            className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Add Book
          </button>
        )}
        {isEditing && (
          <UpdateBook book={selectedBook} handleUpdateBook={handleUpdateBook} setIsEditing={setIsEditing} />
        )}

        {isAddBookVisible && (
          <AddBook
            message={message}
            addBook={addBook}
            newName={newName}
            handleNameChange={handleNameChange}
            newAuthor={newAuthor}
            handleAuthorChange={handleAuthorChange}
            newPoints={newPoints}
            handlePointsChange={handlePointsChange}
            newReview={newReview}
            handleReviewChange={handleReviewChange}
            newReading_Date={newReading_Date}
            handleReading_DateChange={handleReading_DateChange}
            newOwner={newOwner}
            handleOwnerChange={handleOwnerChange}
            newRead={newRead}
            handleReadChange={handleReadChange}
            newPrice={newPrice}
            handlePriceChange={handlePriceChange}
            isAddBookVisible={isAddBookVisible}
            setIsAddBookVisible={setIsAddBookVisible}
          />
        )}
      </div>
      <FilterName handleFilter={handleFilter} />
      <DataFilter books={books} searchTerm={searchTerm} setBooks={setBooks} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}


export default App
