
const BookData = ({ book }) => {

    return (
        <div key={book.id}>
            <p>{book.name}</p>
            <p>{book.author}</p>
            <p>{book.points}</p>
            <p>{book.owner}</p>
            <p>{book.price}</p>
            <p>{book.read}</p>
            <br /><br /><br />
        </div>
    );
};

export default BookData