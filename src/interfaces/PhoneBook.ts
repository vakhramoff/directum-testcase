import { Contact } from "./Contact";

/**
 * Interface which describes a phone book
 */
export interface PhoneBook {
    [key: number]: Contact;
}
