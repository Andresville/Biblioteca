import React, { useState, useEffect } from 'react';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loggedUserId = localStorage.getItem('userId');
        if (loggedUserId) {
            setUserId(loggedUserId);
        }

        const fetchBooks = async () => {
            try {
                const response = await api.get('/libros');
                setBooks(response.data);
            } catch (err) {
                console.error('Error al cargar los libros:', err);
                alert('Hubo un error al cargar los libros');
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter(
        (book) =>
            book.titulo.toLowerCase().includes(search.toLowerCase()) ||
            book.autor.toLowerCase().includes(search.toLowerCase())
    );

    const handleReserveBook = async (bookId) => {
        if (!userId) {
            alert('Debes iniciar sesión para reservar un libro');
            return;
        }

        try {
            const response = await api.post('/prestados', { bookId, userId });
            alert('Libro reservado');

            // Actualiza el estado del libro inmediatamente después de la reserva
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookId
                        ? { ...book, total_disponibles: book.total_disponibles - 1, reservado: true }
                        : book
                )
            );
        } catch (err) {
            console.error('Error al reservar libro:', err);
            alert('Hubo un error al reservar el libro');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Biblioteca en Línea</h2>

            <div className="row mb-4">
                <div className="col-md-6 offset-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por título o autor"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {filteredBooks.length > 0 ? (
                <div className="row">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="col-md-4 mb-4">
                            <div className="card shadow-lg border-light rounded-3">
                                <div className="card-body">
                                    <h5 className="card-title text-dark">{book.titulo}</h5>
                                    <p className="card-text text-muted">{book.autor}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="card-text">
                                            <strong>{book.total_disponibles}</strong> disponibles
                                        </p>
                                        <span
                                            className={`badge ${book.reservado ? 'bg-secondary' : 'bg-success'}`}
                                        >
                                            {book.reservado ? 'Reservado' : 'Disponible'}
                                        </span>
                                    </div>

                                    {book.reservado ? (
                                        <button className="btn btn-secondary w-100" disabled>
                                            Reservado
                                        </button>
                                    ) : (
                                        book.total_disponibles > 0 && (
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() => handleReserveBook(book.id)}
                                            >
                                                {book.reservado ? 'Reservado' : 'Reservar'}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    No se encontraron libros que coincidan con tu búsqueda.
                </div>
            )}
        </div>
    );
};

export default User;
