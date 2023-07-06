import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserById, findUserByUsername } from '../service/database';

const SECRET_KEY = "manage"; 


export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.locals.user = user;
    res.locals.token = token;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    res.locals.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = res.locals;

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.locals.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Failed to authorize user' });
  }
};
