const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const schema = new Schema({
  nombre: String,
  especialidad: String,
  capitulos: {
    type: Number,
    min: 1, max: 100
  }
});

schema.set('toJSON', {
  transform: ((document, toJSON) => {
    toJSON.id = toJSON._id.toString();
    delete toJSON._id;
    delete toJSON.__v;
  })
});

const Chef = model('Chef', schema);

module.exports = Chef;