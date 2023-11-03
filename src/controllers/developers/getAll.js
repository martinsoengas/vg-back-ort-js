import { Developer } from '../../models/associations.js';
import { Sequelize } from 'sequelize';

export const getAll = async (req, res) => {
  try {
    const limit = req.query.limit ? +req.query.limit : 20;
    let page = req.query.page ? +req.query.page : 1;

    if (page < 1) page = 1;

    const companyName = req.query.companyName || false;

    let whereClause = {};

    if (companyName) {
      whereClause.name = {
        [Sequelize.Op.like]: `%${companyName}%`,
      };
    }

    const count = await Developer.count({
      where: whereClause,
    });

    const developers = await Developer.findAll({
      where: whereClause,
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
      results: developers,
    };

    return res.status(200).send(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || 'An unknown error occurred',
    });
  }
};
