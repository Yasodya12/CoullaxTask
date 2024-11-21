import React from "react";

const BookList = ({ books, onEdit, onDelete }) => {
    const renderStars = (rating) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <ul className="space-y-4">
            {books.map((book) => (
                <li key={book.id} className="p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-bold">{book.title}</h3>
                    <p>
                        <strong>Author:</strong> {book.author}
                    </p>
                    <div>
                        <strong>Rating:</strong> {renderStars(book.rating)}
                    </div>
                    <p>
                        <strong>Review:</strong> {book.review}
                    </p>
                    <p>
                        <strong>Date Added:</strong> {book.date}
                    </p>
                    <div className="flex space-x-2 mt-2">
                        <button
                            onClick={() => {
                                console.log("Editing book:", book); // Debugging
                                onEdit(book);
                            }}
                            className="px-4 py-2 text-white bg-yellow-500 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(book.id)}
                            className="px-4 py-2 text-white bg-red-500 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BookList;
