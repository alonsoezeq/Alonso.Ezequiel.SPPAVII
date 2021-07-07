const mongoose = require('mongoose');

const { connect } = mongoose;

const db = async () => {
  connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};

db()
.then(res => console.log('Successfuly connected'))
.catch(err => console.log(err));