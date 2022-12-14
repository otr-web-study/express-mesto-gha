const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const ObjectNotFoundError = require('./errors/ObjectNotFoundError');
const centralizedErrorHandling = require('./middlewares/centralizedErrorHandling');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => console.log(err));

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', authRouter);
app.all('*', (req, res, next) => {
  next(new ObjectNotFoundError('Несуществующий путь.'));
});

app.use(errors());

app.use(centralizedErrorHandling);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
