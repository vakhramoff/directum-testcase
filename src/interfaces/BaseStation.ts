import { PhoneNumber } from "../types/PhoneNumber";
import { CellPhone } from "./CellPhone";

/**
 * Interface which describes a base station
 */
export interface BaseStation {
    readonly name: string;
    registerPhone: (phone: CellPhone) => Promise<boolean>;
    makeCall: (from: CellPhone, to: PhoneNumber) => Promise<boolean>;
}
