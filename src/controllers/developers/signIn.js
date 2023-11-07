import bcrypt from 'bcrypt';

import { tokenGenerator } from '../../helpers/tokenGenerator.js';

import { Developer } from '../../models/associations.js';

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dev = await Developer.findOne({
      where: { email: email },
    });

    if (!dev) {
      return res.send(JSON.stringify({ failed: 'Wrong email or password' }));
    }

    const isValidPassword = await bcrypt.compare(password, dev.password);
    if (!isValidPassword) {
      return res.send({ failed: 'Email o contraseña errónea.' });
    }

    const token = await tokenGenerator(email);

    await dev.update({ accessToken: token });

    const returnDev = {
      id: dev.id,
      companyName: dev.companyName,
      description: dev.description,
      country: dev.country,
      email: dev.email,
      accessToken: token,
    };

    return res.status(200).send(returnDev);
  } catch (err) {
    console.log(err);
    res.message = err;
    return res.status(500).send(err);
  }
};
