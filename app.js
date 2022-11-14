const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const { BASE_PATH, PORT } = require('./config');
const { requestLogger } = require('./middlewares/logger');

const { MONGODB_URI = 'mongodb://localhost:27017/mestodb' } = process.env; // for test ok
const app = express();

app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .catch((err) => console.log(err));

app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(`${BASE_PATH}:${PORT}`);
});

module.exports.app = app;
