import React, { useState, useEffect } from "react";


const BookForm = ({ onSave, editingBook }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(0); // Default no stars selected
    const [review, setReview] = useState("");
    const [date, setDateAdded] = useState("");



    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title);
            setAuthor(editingBook.author);
            setRating(editingBook.rating);
            setReview(editingBook.review);
            setDateAdded(editingBook.date);

        } else {
            setTitle("");
            setAuthor("");
            setRating(0); // Reset to no stars selected when adding a new book
            setReview("");
            setDateAdded(new Date().toISOString().split("T")[0]);
        }
    }, [editingBook]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: editingBook ? editingBook.id : null, // Pass ID for editing
            title,
            author,
            rating,
            review,
            date,
        });
    };

    const renderStars = () => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setRating(star)} // Set rating on click
                        className={`text-2xl cursor-pointer ${
                            star <= rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-bold mb-2">{editingBook ? "Edit Book" : "Add Book"}</h2>
            <div className="mb-2">
                <label className="block font-bold">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block font-bold">Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block font-bold">Rating:</label>
                {renderStars()}
            </div>
            <div className="mb-2">
                <label className="block font-bold">Review:</label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-2">
                <label className="block font-bold">Date Added:</label>
                <input
                    type="text"
                    value={date}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-200"
                />
            </div>
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                {editingBook ? "Update Book" : "Add Book"}
            </button>
        </form>
    );
};

export default BookForm;
