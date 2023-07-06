import Datastore from 'nedb';
import { Drone } from '../model/drone';
import { User } from '../model/user';
import { Audit } from '../model/audit';
import { State } from '../utils/state';
import { Medication } from '../model/medication';

const usersDB = new Datastore({ filename: './db/users.db', autoload: true });
const dronesDB = new Datastore({ filename: './db/drones.db', autoload: true });
const auditsDB = new Datastore({ filename: './db/audits.db', autoload: true });
const medicationDB = new Datastore({ filename: './db/medications.db', autoload: true });



export const saveDrone = (drone: Drone): Promise<Drone>  =>{
    return new Promise((resolve, reject) => {
        dronesDB.insert(drone, (err, droneObj) => {
            if(err){
                reject(err);
            } else {
                resolve(droneObj);
            }
        });
    });
}

export const findDroneBySerialNumber = (serialNumber: string): Promise<Drone | null> => { 
    return new Promise((resolve, reject) => {
        dronesDB.findOne({serialNumber}, (err, drone) => {
            if(err) {
                reject(err);
            } else {
                resolve(drone);
            }
        });
    })
}

export const updateDrone = (drone: Drone): Promise<Drone> =>{
    return new Promise((resolve, reject) => {
        dronesDB.update({ _id: drone._id }, drone, {}, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(drone);
            }
          });
    });
  }

export const findIdleStateDrones = (): Promise<Drone[] | null>  =>{
    return new Promise((resolve, reject) => {
        dronesDB.find({state: State.IDLE}, (err:any, drones: Array<Drone>) =>{
            if(err){
                reject(err);
            } else{
                resolve(drones);
            }
        });
});
}

export const getAllDrones= (): Promise<Drone[] | null> => {
    return new Promise((resolve, reject) => {
        dronesDB.find({}, (err:any, drones: Array<Drone>) =>{
            if(err){
                reject(err);
            } else{
                resolve(drones);
            }
        });
    });
}


export const save = (user: User): Promise<User> => {
    return new Promise((resolve, reject) => {
        usersDB.insert(user, (err, newUser) => {
            if(err) {
                reject(err);
            } else {
                resolve(newUser);
            }
        });
    });
}

export const findUserByUsername = (username: string) : Promise<User | null> => {
    return new Promise((resolve, reject) => {
        usersDB.findOne({ username }, (err, user) => {
            if(err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
}

export const findUserById = (id: string) : Promise<User | null>  =>{
    return new Promise((resolve, reject) => {
        usersDB.findOne({ id }, (err, user) => {
            if(err){
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
}

export const saveAudit = (audit: Audit): Promise<Audit> => {
    return new Promise((resolve, reject) => {
        auditsDB.insert(audit, (err, aduitObj) => {
            if(err){
                reject(err);
            } else {
                resolve(aduitObj);
            }
        });
    });
}

export const saveMedication = (medication: Medication): Promise<Medication> => {
    return new Promise((resolve, reject) => {
        medicationDB.insert(medication, (err, medicationObj) => {
            if(err){
                reject(err);
            } else {
                resolve(medicationObj);
            }
        });
    });
}