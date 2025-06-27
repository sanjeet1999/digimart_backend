import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const generateToken = (userId) => {
    console.log("creating jwt token for userId:", userId);
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30min', // Adjust as needed
  });
};

export default generateToken;