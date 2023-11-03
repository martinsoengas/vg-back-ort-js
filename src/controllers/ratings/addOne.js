import { Rating } from '../../models/associations.js';
import { Videogame } from '../../models/associations.js';

export const addOne = async (req, res) => {
  try {
    const { videogameId, userId, score, comment } = req.body;

    let videogame = await Videogame.findByPk(videogameId);

    if (!videogame) return res.status(404).send('Game not found');

    let rating = {
      videogameId,
      userId,
      score,
      comment,
    };

    await Rating.create(rating);

    if (videogame.averageRating == 0) {
      videogame.averageRating = parseInt(score);
      videogame.ratingCount++;
    } else {
      let totalRatingSum = videogame.averageRating * videogame.ratingCount;
      totalRatingSum += parseInt(score);
      videogame.ratingCount++;
      videogame.averageRating = totalRatingSum / videogame.ratingCount;
    }

    await videogame.save();

    res.status(201).send('Rating added successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || 'An unknown error occurred',
    });
  }
};
