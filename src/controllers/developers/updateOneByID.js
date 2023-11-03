import { Developer } from '../../models/associations.js';

export const updateOneByID = async (req, res) => {
  try {
    const id = req.params.id;

    const { name, ...updateData } = req.body;

    if (!name) return res.status(400).send('Name cannot be empty');
    if (!id) return res.status(400).send('Send data required');

    const developer = await Developer.findByPk(id);

    if (!developer) {
      return res.status(404).send('Developer not found');
    }

    await developer.update({ name, ...updateData });

    return res.status(200).send('Developer updated');
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || 'An unknown error occurred',
    });
  }
};
