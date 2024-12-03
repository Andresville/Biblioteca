const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/', (req, res) => {
  connection.query('SELECT * FROM estado', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener los estados' });
    }
    res.json(results);
  });
});

module.exports = router;
