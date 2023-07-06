import { DroneController } from '../controller/drone-controller';
import { Drone } from '../model/drone';
import { Medication } from '../model/medication';
import * as databaseService from '../service/database';
import { State } from '../utils/state';

const droneController = new DroneController();
jest.mock('../service/database');

describe('Drone Unit Tests', () => {
  describe('registerDrone', () => {
    it('should register a new drone', async () => {
      const req: any = { body: { serialNumber: '123', model: 'Lightweight', weightLimit: 200, batteryCapacity: 80 } };
      const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await droneController.registerDrone(req, res);

      expect(databaseService.saveDrone).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Drone registered successfully' });
    });

    it('should handle errors during drone registration', async () => {
      const req: any = { body: { serialNumber: '123', model: 'Lightweight', weightLimit: 200, batteryCapacity: 80 } };
      const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    //   databaseService.saveDrone.mockRejectedValue(new Error('Database error'));

      await droneController.registerDrone(req, res);

      expect(databaseService.saveDrone).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to register drone' });
    });
  });

  describe('loadMedication', () => {
    it('should load medication onto a drone', async () => {
      const medication: Medication = { name: 'Med1', weight: 10, code: 'CODE123', image: 'med1.jpg' };
      const drone: Drone = {
        serialNumber: '123',
        model: 'Lightweight',
        weightLimit: 200,
        batteryCapacityLevel: 80,
        state: State.IDLE,
        medication: [],
      };
      const req: any = { body: { droneSerialNumber: '123', medication } };
      const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // databaseService.findDroneBySerialNumber.mockResolvedValue(drone);

      await droneController.loadMedication(req, res);

      expect(databaseService.findDroneBySerialNumber).toHaveBeenCalledWith('123');
      expect(databaseService.updateDrone).toHaveBeenCalledWith(drone);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Medication loaded successfully' });
    });

    it('should reject loading medication onto an unavailable drone', async () => {
      const medication: Medication = { name: 'Med1', weight: 10, code: 'CODE123', image: 'med1.jpg' };
      const req: any = { body: { droneSerialNumber: '123', medication } };
      const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    //   databaseService.findDroneBySerialNumber.mockResolvedValue(null);

      await droneController.loadMedication(req, res);

      expect(databaseService.findDroneBySerialNumber).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Drone not found' });
    });

    it('should handle errors during medication loading', async () => {
      const medication: Medication = { name: 'Med1', weight: 10, code: 'CODE123', image: 'med1.jpg' };
      const drone: Drone = {
        serialNumber: '123',
        model: 'Lightweight',
        weightLimit: 200,
        batteryCapacityLevel: 80,
        state: State.IDLE,
        medication: [],
      };
      const req: any = { body: { droneSerialNumber: '123', medication } };
      const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    //   databaseService.findDroneBySerialNumber.mockResolvedValue({});
    //   databaseService.updateDrone.mockRejectedValue(new Error('Database error'));

      await droneController.loadMedication(req, res);

      expect(databaseService.findDroneBySerialNumber).toHaveBeenCalledWith('123');
      expect(databaseService.updateDrone).toHaveBeenCalledWith(drone);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to load medication onto drone' });
    });
  });

  describe('checkBatteryLevel', () => {
    it('should return the battery level of a drone', async () => {
      const drone: Drone = {
        serialNumber: '123',
        model: 'Lightweight',
        weightLimit: 200,
        batteryCapacityLevel: 80,
        state: State.IDLE,
        medication: [],
      };
      const req: any = { params: { droneSerialNumber: '123' } };
      const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    //   databaseService.findDroneBySerialNumber.mockResolvedValue(drone);

      await droneController.checkBatteryLevel(req, res);

      expect(databaseService.findDroneBySerialNumber).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ batteryLevel: 80 });
    });

    it('should handle errors during battery level check', async () => {
      const req: any = { params: { droneSerialNumber: '123' } };
      const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    //   databaseService.findDroneBySerialNumber.mockRejectedValue(new Error('Database error'));

      await droneController.checkBatteryLevel(req, res);

      expect(databaseService.findDroneBySerialNumber).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to check battery level' });
    });
  });
});
