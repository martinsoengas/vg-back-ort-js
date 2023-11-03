import { Developer } from '../../models/associations.js';

export const deleteOneByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send('Send data required');

    const result = await Developer.destroy({
      where: { id: id },
    });

    if (result === 0) return res.status(404).send('Developer not found');

    return res.status(200).send('Developer deleted');
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: 'An unknown error occurred' });
    }
  }
};
