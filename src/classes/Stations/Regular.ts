import { BaseStation } from "../../interfaces/BaseStation";
import { CellPhone } from "../../interfaces/CellPhone";
import { PhoneNumber } from "../../types/PhoneNumber";

export class RegularBaseStation implements BaseStation{
    private _phonesList: CellPhone[];
    private _name: string;

    public get name() {
        return this._name;
    }

    constructor(name: string) {
        this._phonesList = [];

        this._name = name;
    }

    makeCall(from: CellPhone, to: PhoneNumber): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (!from && !to) {
                reject(false);
            }

            const registeredPhones = this._phonesList.map(phone => phone.simCardNumber);
            if (registeredPhones.indexOf(from.simCardNumber) !== -1 && registeredPhones.indexOf(to) !== -1) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    }

    registerPhone(phone: CellPhone): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (!phone) {
                reject(false);
            }

            if (phone?.IMEI !== '' && phone?.simCardNumber !== '') {
                this._phonesList.push(phone);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

}
