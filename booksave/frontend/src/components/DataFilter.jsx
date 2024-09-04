import React from 'react'



import BookData from './BookData'



function DataFilter({ books, searchTerm, handleDelete, handleEdit }) {

    const filteredBooks = searchTerm !== ''
        ? books.filter(book =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.points.toString().includes(searchTerm) ||
            book.reading_Date.includes(searchTerm) ||
            book.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.price.toString().includes(searchTerm)
        )
        : books;

    return (
        <>
            {
                searchTerm !== '' && <h2>Filtered books</h2>
            }
            <BookData books={filteredBooks} handleDelete={handleDelete} handleEdit={handleEdit} />
        </>
    );
}

export default DataFilter