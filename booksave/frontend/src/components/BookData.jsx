
const BookData = ({ books, handleDelete, handleEdit }) => {


    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Read</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.points}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.review}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.reading_Date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.owner}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.read ? 'Yes' : 'No'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                                <button onClick={() => handleEdit(book)} className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(book.id)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


};

export default BookData