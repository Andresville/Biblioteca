const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // Importar la conexión

// Obtener todos los préstamos
router.get('/', (req, res) => {
  const query = 'SELECT p.id, l.titulo, u.nombre, p.fecha_prestamo, p.fecha_devolucion FROM prestados p INNER JOIN libros l ON p.id_libro = l.id INNER JOIN usuario u ON p.id_usuario = u.id';

  connection.query(query, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error al obtener los préstamos' });
      }

      res.status(200).json(results);
  });
});

// Crear un nuevo préstamo
router.post('/', (req, res) => {
    const { bookId, userId } = req.body;

    // Verificar si el usuario ya tiene un préstamo activo para este libro
    connection.query(
        'SELECT * FROM prestados WHERE id_libro = ? AND id_usuario = ? AND fecha_devolucion IS NULL',
        [bookId, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al consultar los préstamos activos' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Ya tienes un préstamo activo para este libro' });
            }

            // Verificar si el libro tiene copias disponibles
            connection.query('SELECT COUNT(*) AS availableCopies FROM copias_libros WHERE id_libro = ? AND prestado = 0', [bookId], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error al consultar el libro' });
                }

                if (results[0].availableCopies <= 0) {
                    return res.status(400).json({ error: 'No hay copias disponibles para este libro' });
                }

                // Si hay copias disponibles, registrar el préstamo
                connection.query(
                    'SELECT id FROM copias_libros WHERE id_libro = ? AND prestado = 0 LIMIT 1', 
                    [bookId],
                    (err, availableCopy) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: 'Error al obtener copia disponible' });
                        }

                        const copyId = availableCopy[0].id;

                        // Insertar el nuevo préstamo
                        const queryPrestamo = 'INSERT INTO prestados (id_libro, id_usuario, fecha_prestamo, id_copia) VALUES (?, ?, NOW(), ?)';
                        connection.query(queryPrestamo, [bookId, userId, copyId], (err, results) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ error: 'Error al crear el préstamo' });
                            }

                            // Marcar la copia como prestada
                            const queryActualizarCopia = 'UPDATE copias_libros SET prestado = 1 WHERE id = ?';
                            connection.query(queryActualizarCopia, [copyId], (err, updateResults) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({ error: 'Error al actualizar la copia como prestada' });
                                }

                                res.status(201).json({ message: 'Préstamo registrado con éxito' });
                            });
                        });
                    }
                );
            });
        }
    );
});

// Registrar devolución
router.post('/devolucion', (req, res) => {
    const { bookId, userId } = req.body;

    // Actualizar la cantidad disponible del libro al devolverlo
    connection.query(
        'UPDATE copias_libros SET prestado = 0 WHERE id_libro = ? AND prestado = 1 LIMIT 1', 
        [bookId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al registrar la devolución' });
            }

            // Actualizar la fecha de devolución en la tabla de préstamos
            const queryActualizarDevolucion = 'UPDATE prestados SET fecha_devolucion = NOW() WHERE id_libro = ? AND id_usuario = ? AND fecha_devolucion IS NULL';
            connection.query(queryActualizarDevolucion, [bookId, userId], (err, updateResults) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error al actualizar la fecha de devolución' });
                }

                res.status(200).json({ message: 'Devolución registrada con éxito' });
            });
        }
    );
});

module.exports = router;
