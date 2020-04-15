import { RegularBaseStation } from "./Regular";
import { CellPhone } from "../../interfaces/CellPhone";
import { ThirdGenPhone } from "../Phones/ThirdGen";

/**
 * Class which implements a 3G Base Station
 */
export class ThirdGenBaseStation extends RegularBaseStation {
    private _thirdGenPhones: ThirdGenPhone[];

    constructor(name: string) {
        super(name);

        this._thirdGenPhones = [];
    }

    registerPhone(phone: CellPhone): Promise<boolean> {
        /*
            Нарушил O/SOLID, т.к. возникло недопонимание.
            По заданию станция должна регистрировать телефоны, а не телефон регистрироваться на станции.
            Чтобы решить эту проблему, нужно сделать так,
                чтобы именно телефон особенным образом регистрировался на 3G-станции.
            Немного смутил этот момент.
         */
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
