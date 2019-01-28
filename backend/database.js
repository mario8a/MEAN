const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/mean-crud';

mongoose.connect(URI)
    .then(db => console.log("Base de datos online"))
    .catch(err => console.error(err));

module.exports = mongoose;