import { PhoneBook } from "./PhoneBook";
import { BaseStation } from "./BaseStation";
import { PhoneNumber } from "../types/PhoneNumber";

/**
 * Interface which describes a cell phone
 */
export interface CellPhone {
    readonly IMEI: string;
    simCardNumber: PhoneNumber;
    phoneBook: PhoneBook;
    makeConnection: (baseStation: BaseStation) => Promise<boolean>;
    makeCallById: (phoneId: keyof PhoneBook) => Promise<boolean>;
    makeCallByPhoneNumber: (phoneNumber: PhoneNumber) => Promise<boolean>;
    // constructor: (IMEI: CellPhone['IMEI'], simCardNumber: CellPhone['simCardNumber']) => any;
}
