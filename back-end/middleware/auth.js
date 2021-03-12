const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  

  const token = jwt.sign(
    { _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : '4fhKEt3Dk3ds', { expiresIn: '7d' });








  try {
    payload = jwt.verify(token, '4fhKEt3Dk3ds');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Authorization Required' });
  }

  req.user = payload; // assigning the payload to the request object

  next(); // sending the request to the next middleware
}; 