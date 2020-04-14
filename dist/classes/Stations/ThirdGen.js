"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regular_1 = require("./Regular");
const ThirdGen_1 = require("../Phones/ThirdGen");
class ThirdGenBaseStation extends Regular_1.RegularBaseStation {
    constructor(name) {
        super(name);
        this._thirdGenPhones = [];
    }
    registerPhone(phone) {
        if (phone instanceof ThirdGen_1.ThirdGenPhone) {
            this._thirdGenPhones.push(phone);
        }
        return super.registerPhone(phone);
    }
    showAllThirdGenPhones() {
        console.log(`All 3G phones which tried to connect to ${this.name} base station: ${this._thirdGenPhones.map(phone => phone.IMEI)}`);
    }
}
exports.ThirdGenBaseStation = ThirdGenBaseStation;
//# sourceMappingURL=ThirdGen.js.map