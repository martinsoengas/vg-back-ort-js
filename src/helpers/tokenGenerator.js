import jsonwebtoken from 'jsonwebtoken';

// Exported Helper Function
export const tokenGenerator = async (email) => {
  const timestamp = new Date();

  return jsonwebtoken.sign(
    { email: email, iat: timestamp.getTime() },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};
