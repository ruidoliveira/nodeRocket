const mongoose = require('mongoose');

const connectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

mongoose.connect('mongodb://localhost/noderest', connectionOptions);
mongoose.Promise = global.Promise;

module.exports = mongoose;