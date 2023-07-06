
import cron from 'node-cron';
import { DroneDatabase } from "../service/dronedb";
import { AuditDatabase } from "../service/auditdb";
import { Drone } from '../model/drone'; 
import { State } from '../utils/state';

const database = new DroneDatabase();
const auditDatabase = new AuditDatabase();

export const startBatteryLevelCheckCronJob = () => {
  cron.schedule('*/1 * * * *', async () => {
    try {
      // Get all drones from the database
      let drones: Drone[] | null = await database.getAllDrones();
    
      if (drones === null) {
        console.log('No drones found in the database');
        return;
      }
      // Iterate through each drone and check its battery level
      for (const drone of drones) {
        const audit = {serialNumber: drone.serialNumber, batteryLevel: drone.batteryCapacityLevel, createdAt: new Date()}
        auditDatabase.save(audit);
      }
    } catch (err) {
      console.error('Error checking battery levels:', err);
    }
  });
};

export const startChangeDroneStateCronJob = () => {
  cron.schedule('0 0 * * *', async () => {
   try {
    let drones: Drone[] | null = await database.getAllDrones();
    
    if (drones === null) {
      console.log('No drones found in the database');
      return;
    }
    // Iterate through each drone and check its battery level
    for (const drone of drones) {
        const droneObj = await database.findDroneBySerialNumber(drone.serialNumber);
        if (droneObj === null) {
            console.log('No drones found in the database');
            continue;
          }
        delete droneObj?.medication;
        droneObj.state = State.IDLE; 
    }
   } catch (error) {
       
   }
  });

}




