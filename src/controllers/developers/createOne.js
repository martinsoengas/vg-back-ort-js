import { Developer } from '../../models/associations.js';

export const createOne = async (req, res) => {
  try {
    const { name, description, country, foundationDate } = req.body;

    const exists = await Developer.findOne({
      where: {
        name: name,
      },
    });

    if (exists) return res.status(400).send('Developer already exists');

    let developer = {
      name,
      description,
      country,
      foundationDate,
    };

    await Developer.create(developer);

    return res.status(200).send('Developer added successfully');
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: err.message || 'An unknown error occurred' });
  }
};
