import { State } from "../utils/state";
import { Medication } from "./medication";

export interface Drone {
    _id?: string,
    serialNumber: string;
    model: string;
    weightLimit: number;
    batteryCapacityLevel: number;
    state: State;
    medication ?: Array<Medication>
}