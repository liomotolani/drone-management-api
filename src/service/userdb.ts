import Datastore from 'nedb';
import { User } from '../model/user';
import path from 'path';
import fs from 'fs';
const JSON_FILE_PATH = path.join(__dirname,"../../db/users.json");


export class UserDB {

    private usersDB: Datastore;

    constructor(filePath?: string) {
        const dbFilePath = filePath || 'data.db';
    
        this.usersDB = new Datastore({
          filename: dbFilePath,
          autoload: true,
        });
    
        setImmediate(() => {
          this.loadFromFile(JSON_FILE_PATH);
        });
      }

    private loadFromFile(filePath: string) {
        try {
          const fileData = fs.readFileSync('data.db', 'utf-8');
          const jsonData = JSON.parse(fileData);
    
          this.usersDB.insert(jsonData, (err) => {
            if (err) {
              console.error('Error loading data from file:', err);
            } else {
              console.log('Data loaded from file');
            }
          });
        } catch (err) {
          console.error('Error reading file:', err);
        }
      }

    save(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            // const fileData = fs.readFileSync('data.db', 'utf-8');
            // const users: User[] = JSON.parse(fileData);
            // users.push(user);
            // fs.writeFileSync('users.json', JSON.stringify(user, null, 2));
            this.usersDB.insert(user, (err, newUser) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(newUser);
                }
            });
        });
    }

    findUserByUsername(username: string) : Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.usersDB.findOne({ username }, (err, user) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            })
        })
    }

    findUserById(id: string) : Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.usersDB.findOne({ id }, (err, user) => {
                if(err){
                    reject(err);
                } else {
                    resolve(user);
                }
            })
        })
    }
}