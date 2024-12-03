// routes/libros.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/', (req, res) => {
  connection.query('SELECT * FROM libros', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al consultar la base de datos');
    }
    res.json(results); // Devolver los resultados como JSON
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { id_estado } = req.body;

  if (typeof id_estado !== 'number') {
    return res.status(400).json({ message: 'Datos inválidos. Verifica el formato enviado.' });
  }

  const query = 'UPDATE libros SET id_estado = ? WHERE id = ?';
  connection.query(query, [id_estado, id], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json({ message: 'Estado actualizado con éxito' });
  });
});

module.exports = router;
