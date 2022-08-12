const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { ObjectNotFoundError } = require('./errors/errors');
const { handleError } = require('./utils/utils');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => console.log(err));

app.use((req, res, next) => {
  req.user = {
    _id: '62f3ca63ebf6095c6dd826d7',
  };

  next();
});
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.all('*', (req, res) => {
  handleError(new ObjectNotFoundError('Несуществующий путь.'), res);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
