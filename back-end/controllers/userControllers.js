const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { NODE_ENV, JWT_SECRET } = process.env;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../middleware/errors/NotFoundError');
const NotAuthorizedError = require('../middleware/errors/NotAuthorizedError');
const BadRequestError = require('../middleware/errors/BadRequestError');

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
}

function getOneUser(req, res) {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Imaginary profile detected.  No such profile found');
      }
      return res.status(200).send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { email, password, name, about, avatar } = req.body;
  // record data into the database
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name, about, avatar })
        // return the recorded data to the user
        .then((user) => res.status(200).send(user))
        // if the data was not recorded, display an error message
        .catch(next);
    })
}

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id, { name, about },
      { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Imaginary profile detected.  No such profile found');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id, { avatar },
      { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Imaginary profile detected.  No such profile found');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    throw new NotAuthorizedError('Email and Password Combination incorrect');
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotAuthorizedError('Email and Password Combination incorrect');
      }
      const token = jwt.sign(
        { _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : '4fhKEt3Dk3ds', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true
      })
      res.send({ 'token': token })
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user._doc);
      } else {
        throw new NotFoundError('Imaginary profile detected.  No such profile found');
      }
    })
    .catch(next)
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  loginUser,
  getCurrentUser,
  updateAvatar,
};
