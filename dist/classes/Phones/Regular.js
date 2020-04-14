"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class RegularPhone {
    constructor(IMEI, simCardNumber) {
        this.phoneBook = {};
        this._currentBaseStation = null;
        this.IMEI = IMEI;
        this.simCardNumber = simCardNumber;
    }
    addContactToPhoneBook(contact) {
        const newId = Object.keys(this.phoneBook).length + 1;
        this.phoneBook[newId] = Object.assign({}, contact);
    }
    makeCallById(phoneId) {
        const outgoingPhone = this.phoneBook[phoneId].phoneNumber;
        if (outgoingPhone) {
            return this.makeCallByPhoneNumber(outgoingPhone);
        }
        else {
            return Promise.reject(false);
        }
    }
    makeCallByPhoneNumber(phoneNumber) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (this._currentBaseStation === null) {
                reject(false);
            }
            yield this._currentBaseStation.makeCall(this, phoneNumber)
                .then(callMade => {
                resolve(callMade);
            })
                .catch(error => {
                reject(false);
            });
        }));
    }
    makeConnection(baseStation) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield baseStation.registerPhone(this)
                .then(connectionEstablished => {
                if (connectionEstablished) {
                    this._currentBaseStation = baseStation;
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            })
                .catch(error => {
                reject(false);
            });
        }));
    }
}
exports.RegularPhone = RegularPhone;
//# sourceMappingURL=Regular.js.map