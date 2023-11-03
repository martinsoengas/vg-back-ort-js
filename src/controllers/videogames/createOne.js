import { Videogame } from '../../models/associations.js';

export const createOne = async (req, res) => {
  try {
    const { title, description, genre, image, developerId } = req.body;

    if (!title || !description || !genre || !image || !developerId) {
      return res.status(400).send({
        error: 'You must provide all necessary fields to create a videogame.',
      });
    }

    const exists = await Videogame.findOne({ where: { title } });

    if (exists) return res.status(400).send('Videogame already exists');

    const videogame = {
      title,
      description,
      genre,
      image,
      averageRating: 0,
      developerId,
    };

    await Videogame.create(videogame);

    return res.status(200).send('Videogame added successfully');
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: err.message || 'An unknown error occurred' });
  }
};
