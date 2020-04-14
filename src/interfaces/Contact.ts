import { PhoneNumber } from "../types/PhoneNumber";

/**
 * Interface which describes a phone book's contact
 */
export interface Contact {
    firstName: string;
    lastName: string;
    patronymicName: string;
    phoneNumber: PhoneNumber;
}
