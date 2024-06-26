import { MachineType } from "./MachineType";

export class Machine{
    id !: number;
    serialNumber !: string; 
    deviceId !: string;
    machineType !: MachineType;
}