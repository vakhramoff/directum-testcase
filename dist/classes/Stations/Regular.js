"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegularBaseStation {
    constructor(name) {
        this._phonesList = [];
        this._name = name;
    }
    get name() {
        return this._name;
    }
    makeCall(from, to) {
        return new Promise((resolve, reject) => {
            if (!from && !to) {
                reject(false);
            }
            const registeredPhones = this._phonesList.map(phone => phone.simCardNumber);
            if (registeredPhones.indexOf(from.simCardNumber) !== -1 && registeredPhones.indexOf(to) !== -1) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    registerPhone(phone) {
        return new Promise((resolve, reject) => {
            if (!phone) {
                reject(false);
            }
            if ((phone === null || phone === void 0 ? void 0 : phone.IMEI) !== '' && (phone === null || phone === void 0 ? void 0 : phone.simCardNumber) !== '') {
                this._phonesList.push(phone);
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
}
exports.RegularBaseStation = RegularBaseStation;
//# sourceMappingURL=Regular.js.map