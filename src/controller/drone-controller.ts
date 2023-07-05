import { Request, Response } from 'express';
import { Drone } from '../model/drone';
import { Medication } from '../model/medication';
import { DroneDatabase } from "../service/dronedb";
import { generateSerialNumber } from '../utils/generateNumbers';

const database = new DroneDatabase();


export class DroneController {


    registerDrone = async (req: Request, res: Response) => {
        const {  model, weightLimit, batteryCapacityLevel, state } = req.body;
        //TODO: VALIDATE USER INPUT
        const serialNumber = generateSerialNumber(8);
        const drone: Drone = {serialNumber, model, weightLimit, batteryCapacityLevel, state };
        try {
          await database.save(drone);
          res.status(200).json({ message: 'Drone registered successfully' });
        } catch (err) {
          res.status(500).json({ error: 'Failed to register drone' });
        }
      };
      
    loadMedication = async (req: Request, res: Response) => {
        const { droneSerialNumber, name, weight, code, image } = req.body;
      
        try {
          const drone = await database.findDroneBySerialNumber(droneSerialNumber);
      
          if (!drone) {
            res.status(404).json({ error: 'Drone not found' });
          } else if (drone.batteryCapacityLevel < 25) {
            res.status(400).json({ error: 'Drone battery level is below 25%' });
          } else {
            let totalWeight = drone.medication?.reduce((sum, medication) => sum + medication.weight, 0) ?? 0;
            totalWeight += weight;
            if(totalWeight > drone.weightLimit) {
                res.status(400).json({ message: 'Drone weight limit has been exceeded' });
            }
            const medication: Medication = {
              name,
              weight,
              code,
              image,
            };
            drone.medication?.push(medication);   
            await database.updateDrone(drone);
            res.status(200).json({ message: 'Medication loaded successfully' });
          }
        } catch (err) {
          res.status(500).json({ error: 'Failed to load medication' });
        }
      };
      
    checkBatteryLevel = async (req: Request, res: Response) => {
        const { droneSerialNumber } = req.params;
      
        try {
          const drone = await database.findDroneBySerialNumber(droneSerialNumber);
      
          if (!drone) {
            res.status(404).json({ error: 'Drone not found' });
          } else {
            res.status(200).json({ batteryLevel: drone.batteryCapacityLevel });
          }
        } catch (err) {
          res.status(500).json({ error: 'Failed to check battery level' });
        }
      };
}