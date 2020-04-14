import { RegularBaseStation } from "./Regular";
import { CellPhone } from "../../interfaces/CellPhone";
import { ThirdGenPhone } from "../Phones/ThirdGen";

export class ThirdGenBaseStation extends RegularBaseStation {
    private _thirdGenPhones: ThirdGenPhone[];

    constructor(name: string) {
        super(name);

        this._thirdGenPhones = [];
    }

    registerPhone(phone: CellPhone): Promise<boolean> {
        if (phone instanceof ThirdGenPhone) {
            this._thirdGenPhones.push(phone);
        }

        return super.registerPhone(phone);
    }

    showAllThirdGenPhones(): void {
        console.log(
            `All 3G phones which tried to connect to ${this.name} base station: ${this._thirdGenPhones.map(phone => phone.IMEI)}`);
    }
}
