"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regular_1 = require("./classes/Phones/Regular");
const ThirdGen_1 = require("./classes/Phones/ThirdGen");
const Regular_2 = require("./classes/Stations/Regular");
const ThirdGen_2 = require("./classes/Stations/ThirdGen");
const handleError = (e) => {
    console.error(`[!] En exception occurred while running the app! Details: ${e.message}`);
};
try {
    console.log(`[-] Let's run some examples!`);
    const phone1 = new Regular_1.RegularPhone('777 5555 00 1', '89991305100');
    const phone2 = new ThirdGen_1.ThirdGenPhone('666 6666 66 6', '89171234569');
    const phone3 = new ThirdGen_1.ThirdGenPhone('666 0000 99 9', '');
    const station1 = new Regular_2.RegularBaseStation('Regular Station 1');
    const station2 = new ThirdGen_2.ThirdGenBaseStation('3G Station 1');
    let registeringTestCases = [];
    registeringTestCases.push({ phone: phone1, station: station2 });
    registeringTestCases.push({ phone: phone2, station: station2 });
    registeringTestCases.push({ phone: phone3, station: station1 });
    registeringTestCases.forEach(testCase => {
        const { station, phone } = testCase;
        station.registerPhone(phone).then(res => {
            console.log(`Phone ${phone.IMEI} was ${res ? 'successfully' : 'not'} registered on station ${station.name}`);
        });
    });
    station2.showAllThirdGenPhones();
    let callingTestCases = [];
    callingTestCases.push({ phone1: phone1, phone2: phone2, station: station2 });
    callingTestCases.push({ phone1: phone1, phone2: phone3, station: station2 });
    callingTestCases.push({ phone1: phone1, phone2: phone2, station: station1 });
    callingTestCases.forEach(testCase => {
        const { station, phone1, phone2 } = testCase;
        station.makeCall(phone1, phone2.simCardNumber).then(res => {
            console.log(`Phone ${phone1.simCardNumber} ${res ? 'successfully' : 'unsuccessfully'} made call to a ${phone2.simCardNumber} using station ${station.name}`);
        });
    });
}
catch (e) {
    handleError(e);
}
//# sourceMappingURL=app.js.map