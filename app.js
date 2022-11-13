const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/error');
const { MONGODB_URI, BASE_PATH, PORT } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).catch((err) => console.log(err));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('/404', (request, response) => {
  response.status(404).send({ message: 'Page Not Found' });
});
app.all('*', (req, res) => {
  res.redirect('/404');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(`${BASE_PATH}:${PORT}`);
});

module.exports.app = app;
