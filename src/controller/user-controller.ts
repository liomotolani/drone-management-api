import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDB } from "../service/userdb";
import { User } from '../model/user';


const userDB = new UserDB();

const SECRET_KEY = "manage"; 

export class UserController {

    registerUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;
      
        try {
            // validate input
            // check if user already exist
          const hashedPassword = bcrypt.hashSync(password, 10);
          const user: User = { id: Date.now().toString(), username, password: hashedPassword };
      
          await userDB.save(user);
          res.status(200).json({ message: 'User registered successfully', data:user });
        } catch (err) {
          res.status(500).json({ error: 'Failed to register user' });
        }
      };

      loginUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;
      
        try {
          const user = await userDB.findUserByUsername(username);
      
          if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
      
          const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
          res.status(200).json({ token });
        } catch (err) {
          res.status(500).json({ error: 'Failed to login user' });
        }
      };
}