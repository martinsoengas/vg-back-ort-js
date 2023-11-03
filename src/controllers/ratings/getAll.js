import { Rating } from '../../models/associations.js';
import { User } from '../../models/associations.js';
import { Videogame } from '../../models/associations.js';

export const getAll = async (req, res) => {
  try {
    const limit = req.query.limit ? +req.query.limit : 20;
    let page = req.query.page ? +req.query.page : 1;

    if (page < 1) page = 1;

    const videogameId = req.query.videogameId || false;
    const userId = req.query.userId || false;
    const score = req.query.score || false;

    let whereClause = {};

    if (videogameId) whereClause.videogameId = videogameId;
    if (userId) whereClause.userId = userId;
    if (score) whereClause.score = score;

    const count = await Rating.count({
      where: whereClause,
    });

    const ratings = await Rating.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Videogame,
          as: 'Videogame',
          attributes: ['id', 'title', 'genre'],
        },
      ],
      offset: limit * (page - 1),
      limit: limit,
    });

    const from = (page - 1) * limit + 1;
    const to = limit * page > count ? count : limit * page;

    const results = {
      pagination: {
        total: count,
        perPage: limit,
        from: from,
        to: to,
        page: page,
      },
      results: ratings,
    };

    return res.status(200).send(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || 'An unknown error occurred',
    });
  }
};
