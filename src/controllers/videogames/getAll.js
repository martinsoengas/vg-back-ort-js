import { Videogame, Developer } from '../../models/associations.js';

import { Sequelize } from 'sequelize';

export const getAll = async (req, res) => {
  try {
    const limit = req.query.limit ? +req.query.limit : 20;
    let page = req.query.page ? +req.query.page : 1;

    if (page < 1) page = 1;

    const title = req.query.title || false;
    const developerID = req.query.developer || false;

    let whereClause = {};
    if (title) whereClause.title = { [Sequelize.Op.like]: `%${title}%` };
    if (developerID) whereClause.developerId = developerID;

    const count = await Videogame.count({ where: whereClause });
    const videogames = await Videogame.findAll({
      where: whereClause,
      attributes: { exclude: ['createdAt', 'updatedAt', 'developerId'] },
      include: [
        {
          model: Developer,
          as: 'Developer',
          attributes: {
            exclude: [
              'password',
              'accessToken',
              'createdAt',
              'updatedAt',
              'email',
            ],
          },
        },
      ],
      limit: limit,
      offset: (page - 1) * limit,
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
      results: videogames,
    };

    return res.status(200).send(results);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: err.message || 'An unknown error occurred' });
  }
};
