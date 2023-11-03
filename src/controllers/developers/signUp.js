import bcrypt from 'bcrypt';

import { Developer } from '../../models/associations.js';

export const signUp = async (req, res) => {
  try {
    const {
      companyName,
      description,
      country,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (!companyName || !password || !confirmPassword) {
      return res.status(400).send({
        error: 'You must provide all necessary fields to create an account.',
      });
    }

    if (password !== confirmPassword)
      return res.status(400).send('Password do not match');

    let existingUser = await Developer.findOne({
      where: { email: description },
    });
    if (existingUser) return res.status(400).send('User already exists');

    const hashPassword = bcrypt.hashSync(password, 10);

    await Developer.create({
      companyName,
      description,
      country,
      email,
      password: hashPassword,
    });

    return res.status(200).json('Developer created');
  } catch (err) {
    console.log(err);
    res.message = err;
    return res.status(500).send(err);
  }
};
