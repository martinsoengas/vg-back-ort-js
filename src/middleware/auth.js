import JWT from 'jsonwebtoken';
import Users from '../models/users.model.js';
import Developer from '../models/developers.model.js';

export const validateToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) return res.status(401).send('Unauthorized');

    token = token.replace('Bearer ', '');

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      console.log(err);
      if (err) return res.status(401).send('Unauthorized');
      if (decode) {
        req.verify = { ...decode, accessToken: token };

        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || 'An unknown error occurred',
    });
  }
};

export const validateUser = async (req, res, next) => {
  try {
    const user = req.verify;

    const email = user.email;
    if (!email) return res.status(403).send('Unauthorized');

    const userFound = await Users.findOne({ where: { email: email } });
    if (!userFound) return res.status(403).send('Unauthorized');

    if (userFound.accessToken !== user.accessToken)
      return res.status(403).send('Unauthorized');

    req.user = userFound;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || 'An unknown error occurred',
    });
  }
};

export const validateDev = async (req, res, next) => {
  try {
    const dev = req.verify;

    const email = dev.email;
    if (!email) return res.status(403).send('Unauthorized');

    const devFound = await Developer.findOne({ where: { email: email } });
    if (!devFound) return res.status(403).send('Unauthorized');

    if (devFound.accessToken !== dev.accessToken)
      return res.status(403).send('Unauthorized');

    req.dev = devFound;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || 'An unknown error occurred',
    });
  }
};
