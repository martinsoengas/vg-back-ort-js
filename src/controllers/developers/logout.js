export const logout = async (req, res) => {
  try {
    const dev = req.dev;

    await dev.update({ accessToken: '' });
    return res.status(200).send('User loggued out succesfully');
  } catch (err) {
    console.log(err);
    res.message = err;
    return res.status(500).send(err);
  }
};
