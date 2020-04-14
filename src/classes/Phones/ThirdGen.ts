import { RegularPhone } from "./Regular";
import { CellPhone } from "../../interfaces/CellPhone";

export class ThirdGenPhone extends RegularPhone {
    constructor(IMEI: CellPhone['IMEI'], simCardNumber: CellPhone['simCardNumber']) {
        super(IMEI, simCardNumber);
    }
}
