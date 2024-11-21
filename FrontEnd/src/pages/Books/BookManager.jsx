import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BookForm from "./BookForm";
import BookList from "./BookList";

const BookManager = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState("all"); // "all" for all reviews, "my" for my reviews
    const token = useSelector((state) => state.auth.token);
    const id = useSelector((state) => state.auth.id);

    const fetchBooks = async () => {
        try {
            const url =
                filter === "my"
                    ? `http://localhost:8081/book/${id}` // Endpoint for "My Reviews"
                    : "http://localhost:8081/book"; // Endpoint for "All Reviews"

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwidXNlck5hbWUiOiJqb2huX2RvZSIsInJvbGUiOlsiQURNSU4iXSwiZXhwIjoxNzMyMjcxOTc0fQ.tcuNJxWywqv3-t5PCaVut10eKZ6ul5IlTXlG1Lssx58`, // Use token from state
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch books: ${response.statusText}`);

            const data = await response.json();
            setBooks(data); // Update books state with fetched data
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message); // Update error state with error message
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [filter]); // Refetch books whenever the filter changes

    const saveBook = async (book) => {
        try {
            const response = await fetch("http://localhost:8081/book", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    rating: book.rating,
                    review: book.review,
                    date: book.date,
                    userId: id,
                }),
            });

            if (!response.ok) throw new Error("Failed to save book");

            fetchBooks(); // Refresh book list after saving
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteBook = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/book/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to delete book");

            fetchBooks(); // Refresh book list
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Book Review Manager</h1>

            {/* Radio Buttons for Filter */}
            <div className="flex justify-center mb-4 space-x-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="all"
                        checked={filter === "all"}
                        onChange={() => setFilter("all")}
                        className="form-radio"
                    />
                    <span>All Reviews</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="my"
                        checked={filter === "my"}
                        onChange={() => setFilter("my")}
                        className="form-radio"
                    />
                    <span>My Reviews</span>
                </label>
            </div>

            <BookForm onSave={saveBook} editingBook={editingBook} />
            <BookList books={books} onEdit={setEditingBook} onDelete={deleteBook} />

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
};

export default BookManager;
