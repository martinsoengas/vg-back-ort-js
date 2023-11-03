import bcrypt from 'bcrypt';

import { User } from '../../models/associations.js';

export const signUp = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).send({
        error: 'You must provide all necessary fields to create an account.',
      });
    }

    if (password !== confirmPassword)
      return res.status(400).send('Password do not match');

    let existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) return res.status(400).send('User already exists');

    const hashPassword = bcrypt.hashSync(password, 10);

    await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(200).json('User created');
  } catch (err) {
    console.log(err);
    res.message = err;
    return res.status(500).send(err);
  }
};
