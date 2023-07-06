import { Router} from 'express';
import {DroneController} from '../controller/drone-controller';
import { verifyToken, authorizeUser } from '../middleware/auth';
import { validateLoadDroneInput, validateRegisterDroneInput } from '../utils/validator';


const router = Router();
const drone = new DroneController();

router.post("/register", verifyToken ,authorizeUser ,validateRegisterDroneInput,drone.registerDrone);
router.put("/load",  verifyToken ,authorizeUser, validateLoadDroneInput,drone.loadMedication);
router.get("/battery-level/:droneSerialNumber",  verifyToken , authorizeUser, drone.checkBatteryLevel);
router.get("/medications/:droneSerialNumber", verifyToken , authorizeUser,  drone.getDroneLoadedMedications);
router.get("/available",  verifyToken , authorizeUser, drone.getAllAvaialableDrones);


export default router;