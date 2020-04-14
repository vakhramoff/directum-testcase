import { CellPhone } from "../../interfaces/CellPhone";
import { PhoneBook } from "../../interfaces/PhoneBook";
import { PhoneNumber } from "../../types/PhoneNumber";
import { BaseStation } from "../../interfaces/BaseStation";
import { Contact } from "../../interfaces/Contact";

export class RegularPhone implements CellPhone {
    readonly IMEI: string;

    public phoneBook: PhoneBook = {};
    public simCardNumber: PhoneNumber;

    private _currentBaseStation: BaseStation = null;

    constructor(IMEI: CellPhone['IMEI'], simCardNumber: CellPhone['simCardNumber']) {
        this.IMEI = IMEI;
        this.simCardNumber = simCardNumber;
    }

    addContactToPhoneBook(contact: Contact) {
        const newId = Object.keys(this.phoneBook).length + 1;

        this.phoneBook[newId] = {...contact};
    }

    makeCallById(phoneId: keyof PhoneBook): Promise<boolean> {
        const outgoingPhone: PhoneNumber = this.phoneBook[phoneId].phoneNumber;

        if (outgoingPhone) {
            return this.makeCallByPhoneNumber(outgoingPhone);
        } else {
            return Promise.reject(false);
        }
    }

    makeCallByPhoneNumber(phoneNumber: PhoneNumber): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            if (this._currentBaseStation === null) {
                reject(false);
            }

            await this._currentBaseStation.makeCall(this, phoneNumber)
                .then(callMade => {
                    resolve(callMade);
                })
                .catch(error => {
                    reject(false);
                });
        })
    }

    makeConnection(baseStation: BaseStation): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            await baseStation.registerPhone(this)
                .then(connectionEstablished => {
                    if (connectionEstablished) {
                        this._currentBaseStation = baseStation;
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(error => {
                    reject(false);
                });
        });
    }
}
