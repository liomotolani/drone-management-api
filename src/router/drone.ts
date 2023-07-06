import { Router} from 'express';
import {DroneController} from '../controller/drone-controller';
import { authenticateUser } from '../middleware/auth';


const router = Router();
const drone = new DroneController();

router.post(
    "/register", 
    // authenticateUser,
    drone.registerDrone
);
router.put("/load", drone.loadMedication);
router.get("/battery-level/:droneSerialNumber", drone.checkBatteryLevel);
router.get("/medications/:droneSerialNumber", drone.getDroneLoadedMedications);
router.get("/available", drone.getAllAvaialableDrones);


export default router;