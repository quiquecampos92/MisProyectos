import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateBook = ({ book, handleUpdateBook, setIsEditing }) => {
    const [name, setName] = useState(book.name);
    const [author, setAuthor] = useState(book.author);
    const [points, setPoints] = useState(book.points);
    const [review, setReview] = useState(book.review);
    const [readingDate, setReadingDate] = useState(new Date(book.reading_Date));
    const [owner, setOwner] = useState(book.owner);
    const [read, setRead] = useState(book.read);
    const [price, setPrice] = useState(book.price);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedBook = {
            id: book.id,
            name,
            author,
            points,
            review,
            reading_Date: readingDate.toISOString().split('T')[0],
            owner,
            read,
            price
        };

        handleUpdateBook(updatedBook);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Title:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Author:</label>
                    <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Points:</label>
                    <input
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Review:</label>
                    <input
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Reading Date:</label>
                    <DatePicker
                        selected={readingDate}
                        onChange={(date) => setReadingDate(date)}
                        dateFormat="dd-MM-yyyy"
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Owner:</label>
                    <input
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Read:</label>
                    <input
                        type="checkbox"
                        checked={read}
                        onChange={(e) => setRead(e.target.checked)}
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Price:</label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBook;
