import Datastore from 'nedb';
import { User } from '../model/user';



export class UserDB {

    private usersDB: Datastore;

    constructor() {    
        this.usersDB = new Datastore({
          filename: './db/user.db',
          autoload: true,
        });
    
      }

    save(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
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