'use strict';

const express = require('express');
const router = express.Router();
const Chef = require('../models/Chef');
const auth = require('../middlewares/auth');

// Leer todos los chefs
router.get('/', auth(), (req, res, next) => {
  Chef.find({}).then((data) => res.json(data));
});

// Leer chef por id
router.get('/:id', auth(), (req, res, next) => {
  Chef.findById(req.params.id)
  .then(data => res.status(res ? 200 : 404).json(data))
  .catch(err => res.status(500).send({ message: err}));
});

// Crear chef
router.post('/', auth(), (req, res, next) => {
  const { nombre, especialidad, capitulos } = req.body;

  if (!nombre || !especialidad) {
    res.status(400).send({ message: 'Parámetros inválidos.' });
  }

  const chef = new Chef({ nombre, especialidad, capitulos });

  chef.save()
  .then(data => res.json(data))
  .catch(err => res.status(500).send({ message: err }));
});

// Editar chef
router.put('/:id', auth(), (req, res, next) => {
  const { nombre, especialidad, capitulos } = req.body;
  const chef = {};

  if (nombre) {chef.nombre = nombre;}
  if (especialidad) {chef.especialidad = especialidad;}
  if (capitulos) {chef.capitulos = capitulos;}

  Chef.findByIdAndUpdate(req.params.id, chef, { new: true })
  .then(data => res.status(data ? 200 : 400).send(data))
  .catch(err => res.status(404).send())
});

// Borrar chef
router.delete('/:id', auth(), (req, res, next) => {
  Chef.findByIdAndRemove(req.params.id)
  .then(data => res.status(data ? 204 : 404).send())
  .catch(err => res.status(500).send({ message: err }));
});

module.exports = router;