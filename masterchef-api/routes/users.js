'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Leer todos los users
router.get('/', (req, res, next) => {
  User.find({}).then((data) => res.json(data));
});

// Leer user por id
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(data => res.status(res ? 200 : 404).json(data))
  .catch(err => res.status(500).send({ message: err}));
});

// Crear user
router.post('/', (req, res, next) => {
  const { nombre, mail, password } = req.body;

  if (!nombre || !mail || !password) {
    res.status(400).send({ message: 'Parámetros inválidos.' });
  }

  const user = new User({ nombre, mail, password });

  user.save()
  .then(data => res.json(data))
  .catch(err => res.status(500).send({ message: err }));
});

// Editar user
router.put('/:id', (req, res, next) => {
  const { nombre, mail, password } = req.body;
  const user = {};

  if (nombre) {user.nombre = nombre;}
  if (mail) {user.mail = mail;}
  if (password) {user.password = password;}

  User.findByIdAndUpdate(req.params.id, user, { new: true })
  .then(data => res.status(data ? 200 : 400).send(data))
  .catch(err => res.status(404).send())
});

// Borrar user
router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
  .then(data => res.status(data ? 204 : 404).send())
  .catch(err => res.status(500).send({ message: err }));
});

// Auth user
router.post('/auth', (req, res, next) => {
  const { nombre, password } = req.body;

  User.findOne({
    'nombre': nombre
  })
  .then(data => {
    if (bcrypt.compareSync(password, data.password)) {
      const token = jwt.sign({
        'nombre': data.nombre,
        'mail': data.mail
      }, process.env.JWT_SECRET);
      res.status(200).send({ token });
    } else {
      res.status(401).send();
    }
  })
  .catch(err => res.status(401).send());
});

module.exports = router;