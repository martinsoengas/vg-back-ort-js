import { Rating } from '../../models/associations.js';
import { Videogame } from '../../models/associations.js';

export const updateOne = async (req, res) => {
  try {
    const id = req.params.id;

    const { score } = req.body;

    if (!id) return res.status(400).send('Send data required');

    const rating = await Rating.findByPk(id);

    if (!rating) {
      return res.status(404).send('Rating not found');
    }

    let videogame = await Videogame.findByPk(rating.videogameId);

    if (!videogame) {
      return res.status(404).send('Videogame not found');
    }

    let totalRatingSum = videogame.averageRating * videogame.ratingCount;
    if (score > rating.score) {
      totalRatingSum += parseInt(score) - parseInt(rating.score);
    } else {
      totalRatingSum -= parseInt(rating.score) - parseInt(score);
    }
    videogame.averageRating = totalRatingSum / videogame.ratingCount;

    await videogame.save();

    await rating.update({ score });

    return res.status(200).send('Rating updated');
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || 'An unknown error occurred',
    });
  }
};
