import Datastore from 'nedb';
import { Drone } from '../model/drone';
import { State } from '../utils/state';


export class DroneDatabase {

    private dronesDB: Datastore;


    constructor() {
        this.dronesDB = new Datastore({
            filename: './db/drones.db',
            autoload: true
        });
    }

    save(drone: Drone): Promise<Drone> {
        return new Promise((resolve, reject) => {
            this.dronesDB.insert(drone, (err, droneObj) => {
                if(err){
                    reject(err);
                } else {
                    resolve(droneObj);
                }
            });
        });
    }

    findDroneBySerialNumber(serialNumber: string): Promise<Drone | null> {
        return new Promise((resolve, reject) => {
            this.dronesDB.findOne({serialNumber}, (err, drone) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(drone);
                }
            });
        });
    }

    updateDrone(drone: Drone): Promise<Drone> {
        return new Promise((resolve, reject) => {
            this.dronesDB.update({ _id: drone._id }, drone, {}, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(drone);
                }
              });
        });
      }

      findIdleStateDrones(): Promise<Drone[] | null> {
        return new Promise((resolve, reject) => {
            this.dronesDB.find({state: State.IDLE}, (err:any, drones: Array<Drone>) =>{
                if(err){
                    reject(err);
                } else{
                    resolve(drones);
                }
            });
    });
}

      
}