import jwt from 'jsonwebtoken';
import client from '../db/db-connect.js';

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Token received: ", token);
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).send('Unauthorized: Token expired');
        } else {
          console.log(err);
          return res.status(401).send('Unauthorized: Invalid token');
        }
      } else {
        const db = client.db('badbank')
        const collection = db.collection('users')
        const user = await collection.findOne({ email: decoded.email });
        if (!user) {
          return res.status(401).send('Unauthorized: User not found');
        }
    
        req.user = {
          _id: user._id,
          email: user.email,
          balance: user.balance
        };
        next();
      }
    });
  }
}

export default protect
