import { RegularPhone } from "./Regular";
import { CellPhone } from "../../interfaces/CellPhone";

/**
 * Class which implements a 3G Cell Phone
 */
export class ThirdGenPhone extends RegularPhone {
    constructor(IMEI: CellPhone['IMEI'], simCardNumber: CellPhone['simCardNumber']) {
        super(IMEI, simCardNumber);
    }
}
