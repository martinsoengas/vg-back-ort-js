import { Developer } from '../../models/associations.js';

export const getByID = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).send('Send data required');

    const developer = await Developer.findByPk(id, {
      raw: true,
    });

    if (!developer) {
      return res.status(404).send('Developer not found');
    }

    return res.status(200).send(developer);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || 'An unknown error occurred',
    });
  }
};
