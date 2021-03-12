require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');

const auth = require('./middleware/auth');
const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');
const { createUser, loginUser } = require('./controllers/userControllers');
const { requestLogger, errorLogger } = require('./middleware/logger'); 
const NotFoundError = require('./middleware/errors/NotFoundError.js');
const app = express();
const { PORT = 3000 } = process.env;

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(requestLogger);
// connect to routers
app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), createUser);

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), loginUser);
app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);

app.use(errorLogger);
app.use(errors());

// requested page doesn't exist
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
}); 

app.use((err, req, res, next) => {
  res.send({ message: err.message });
});

app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
}); 

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
