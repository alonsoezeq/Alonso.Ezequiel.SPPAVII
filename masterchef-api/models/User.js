const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { model, Schema } = mongoose;

const schema = new Schema({
  nombre: String,
  mail: String,
  password: String
});

schema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }
  next();
});

schema.set('toJSON', {
  transform: ((document, toJSON) => {
    toJSON.id = toJSON._id.toString();
    delete toJSON._id;
    delete toJSON.__v;
  })
});

const User = model('User', schema);

module.exports = User;