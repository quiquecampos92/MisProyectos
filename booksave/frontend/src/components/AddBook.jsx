import React, { useState } from 'react';
import SuccessMessage from './SuccessMessage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddBook({
    message,
    addBook,
    newName,
    handleNameChange,
    newAuthor,
    handleAuthorChange,
    newPoints,
    handlePointsChange,
    newReview,
    handleReviewChange,
    newReading_Date,
    handleReading_DateChange,
    newOwner,
    handleOwnerChange,
    newRead,
    handleReadChange,
    newPrice,
    handlePriceChange,
    isAddBookVisible,
    setIsAddBookVisible
}) {
    // Local state for the date picker
    const [startDate, setStartDate] = useState(newReading_Date ? new Date(newReading_Date) : null);
    const [errors, setErrors] = useState({});


    const handleDateChange = (date) => {
        setStartDate(date);
        handleReading_DateChange({ target: { value: date ? date.toISOString().split('T')[0] : '' } });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Clear previous errors
        setErrors({});

        // Perform validation and set errors if needed
        let validationErrors = {};

        if (!newName) {
            validationErrors.name = 'Title is required';
        }

        if (!newAuthor) {
            validationErrors.author = 'Author is required';
        }

        if (newPoints < 1 || newPoints > 5 || isNaN(Number(newPoints)) || !newPoints) {
            validationErrors.points = 'Points must be a number between 1 and 5';
        }

        if (newReview.length < 5 || !newReview) {
            validationErrors.review = 'Review must be at least 5 characters';
        }

        if (!newPrice || isNaN(Number(newPrice))) {
            validationErrors.price = 'Price must be a valid number';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        addBook(event);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Book</h2>
            <SuccessMessage message={message} name={newName} />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="max-w-lg mx-auto">
                    <div className="flex items-center space-x-4 mb-4">
                        <label className="block text-gray-700 w-1/3">Title:</label>
                        <div className="flex-1">
                            <input
                                value={newName || ''}
                                onChange={handleNameChange}
                                className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                        <label className="block text-gray-700 w-1/3">Author:</label>
                        <div className="flex-1">
                            <input
                                value={newAuthor || ''}
                                onChange={handleAuthorChange}
                                className={`w-full p-2 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            />
                            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
                        </div>
                    </div>

                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Points: (1 to 5)</label>
                    <div className="flex-1">
                        <input
                            value={newPoints || ''}
                            onChange={handlePointsChange}
                            className={`w-full p-2 border ${errors.points ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.points && <p className="text-red-500 text-sm mt-1">{errors.points}</p>}
                    </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Review:</label>
                    <input
                        value={newReview || ''}
                        onChange={handleReviewChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Reading Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholderText="Select a date"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Owner:</label>
                    <input
                        value={newOwner || ''}
                        onChange={handleOwnerChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="block text-gray-700 w-1/3">Price:</label>
                    <div className="flex-1">
                        <input
                            value={newPrice || ''}
                            onChange={handlePriceChange}
                            className={`w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={newRead || false}
                            onChange={handleReadChange}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-gray-700">Read</span>
                    </label>
                </div>
                <div className='flex flex-row justify-evenly'>
                    <button type="submit" className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                        Add Book
                    </button>
                    <button type='reset'
                        onClick={() => {
                            handleNameChange({ target: { value: '' } });
                            handleAuthorChange({ target: { value: '' } });
                            handlePointsChange({ target: { value: '' } });
                            handleReviewChange({ target: { value: '' } });
                            handleReading_DateChange({ target: { value: '' } });
                            handleOwnerChange({ target: { value: '' } });
                            handlePriceChange({ target: { value: '' } });
                            handleReadChange({ target: { value: false } });
                            setIsAddBookVisible(!isAddBookVisible);
                        }}
                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddBook;
