
import cron from 'node-cron';
import { Drone } from '../model/drone'; 
import { findDroneBySerialNumber, getAllDrones, saveAudit, updateDrone } from '../service/database';
import { State } from '../utils/state';


export const startBatteryLevelCheckCronJob = () => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      // Get all drones from the database
      let drones: Drone[] | null = await getAllDrones();
    
      if (drones === null) {
        console.log('No drones found in the database');
        return;
      }
      // Iterate through each drone and check its battery level
      for (const drone of drones) {
        const audit = {serialNumber: drone.serialNumber, batteryLevel: drone.batteryCapacityLevel, createdAt: new Date()}
        saveAudit(audit);
      }
    } catch (err) {
      console.error('Error checking battery levels:', err);
    }
  });
};

export const startChangeDroneStateCronJob = () => {
  cron.schedule('0 0 * * *', async () => {
   try {
    let drones: Drone[] | null = await getAllDrones();
    
    if (drones === null) {
      console.log('No drones found in the database');
      return;
    }
    // Iterate through each drone and check its battery level
    for (const drone of drones) {
        const droneObj = await findDroneBySerialNumber(drone.serialNumber);
        if (droneObj === null) {
            console.log('No drones found in the database');
            continue;
          }
        delete droneObj?.medication;
        droneObj.state = State.IDLE; 
        updateDrone(droneObj);
    }
   } catch (error) {
       
   }
  });

}




