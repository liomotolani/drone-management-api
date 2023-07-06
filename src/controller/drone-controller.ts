import { Request, Response } from 'express';
import { Drone } from '../model/drone';
import { Medication } from '../model/medication';
import { DroneDatabase } from "../service/dronedb";
import { generateSerialNumber } from '../utils/generateNumbers';
import { State } from '../utils/state';

const database = new DroneDatabase();


export class DroneController {


    registerDrone = async (req: Request, res: Response) => {
        const { model, weightLimit, batteryCapacityLevel } = req.body;
        //TODO: VALIDATE USER INPUT
        console.log(req.body)
        const serialNumber = generateSerialNumber(8);
        const state = State.IDLE;
        const drone: Drone = { serialNumber, model, weightLimit, batteryCapacityLevel, state };
        try {
            await database.save(drone);
            res.status(200).json({ message: 'Drone registered successfully', data: drone});
        } catch (err) {
            res.status(500).json({ error: 'Failed to register drone' });
        }
    };

    loadMedication = async (req: Request, res: Response) => {
        const data = {
            ...req.query,
            ...req.body
        }
        console.log(data);


        try {
            const drone = await database.findDroneBySerialNumber(data.droneSerialNumber);

            if (!drone) {
                res.status(404).json({ error: 'Drone not found' });
            } else if (drone.batteryCapacityLevel < 25) {
                res.status(400).json({ error: 'Drone battery level is below 25%' });
            } else if(drone.state === State.LOADED || drone.state === State.RETURNING || drone.state === State.DELIVERED || drone.state === State.DELIVERING) {
                res.status(400).json({ error: 'Drone not available for loading items' });
            }else {
                let totalWeight = drone.medication?.reduce((sum, medication) => sum + medication.weight, 0) ?? 0;
                totalWeight += data.weight;
                if (totalWeight > drone.weightLimit) {
                    res.status(400).json({ message: 'Drone weight limit has been exceeded' });
                }
                const medication: Medication = {
                    name: data.name,
                    weight: data.weight,
                    code: data.code,
                    image: data.image,
                };
                if(!drone.medication){
                    drone.medication = [];
                    drone.medication?.push(medication);
                }else{
                    drone.medication?.push(medication);
                }
                totalWeight = drone.medication?.reduce((sum, medication) => sum + medication.weight, 0) ?? 0;
                if(totalWeight === drone.weightLimit){
                    drone.state = State.LOADED;
                }else{
                    drone.state = State.LOADING;
                }
                await database.updateDrone(drone);
                res.status(200).json({ message: 'Medication loaded successfully' , data: drone});
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

    getDroneLoadedMedications = async (req: Request, res: Response) => {
        const { droneSerialNumber } = req.params;
        try {
            const drone = await database.findDroneBySerialNumber(droneSerialNumber);

            if (!drone) {
                res.status(404).json({ error: 'Drone not found' });
            } else {
                res.status(200).json({ data: drone.medication });
            }
        } catch (err) {
            res.status(500).json({ error: 'Failed to get loaded medications' });
        }
    }

    getAllAvaialableDrones = async (req: Request, res: Response) => {
        try {
           const drones = await database.findIdleStateDrones();
           res.status(200).json({ data: drones });
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    }
}