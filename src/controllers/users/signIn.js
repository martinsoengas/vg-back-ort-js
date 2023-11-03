import bcrypt from 'bcrypt';

import { tokenGenerator } from '../../helpers/tokenGenerator.js';

import { User } from '../../models/associations.js';

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.send(JSON.stringify({ failed: 'Wrong email or password' }));
    }

    // const isValidPassword = await bcrypt.compare(password, user.password);
    // if (!isValidPassword) {
    //   return res.send({ failed: 'Wrong email or password' });
    // }

    const token = await tokenGenerator(email);

    await user.update({ accessToken: token });

    const returnUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    };

    return res.status(200).send(returnUser);
  } catch (err) {
    console.log(err);
    res.message = err;
    return res.status(500).send(err);
  }
};
