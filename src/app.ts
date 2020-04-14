import { RegularPhone } from "./classes/Phones/Regular";
import { ThirdGenPhone } from "./classes/Phones/ThirdGen";
import { RegularBaseStation } from "./classes/Stations/Regular";
import { ThirdGenBaseStation } from "./classes/Stations/ThirdGen";
import { CellPhone } from "./interfaces/CellPhone";
import { BaseStation } from "./interfaces/BaseStation";

const handleError = (e: Error): void => {
    console.error(`[!] En exception occurred while running the app! Details: ${e.message}`);
}

try {
    console.log(`[-] Let's run some examples!`);

    const phone1 = new RegularPhone('777 5555 00 1', '89991305100');
    const phone2 = new ThirdGenPhone('666 6666 66 6', '89171234569');
    const phone3 = new ThirdGenPhone('666 0000 99 9', '');

    const station1 = new RegularBaseStation('Regular Station 1');
    const station2 = new ThirdGenBaseStation('3G Station 1');

    let registeringTestCases: {phone: CellPhone, station: BaseStation}[] = [];

    registeringTestCases.push({phone: phone1, station: station2});
    registeringTestCases.push({phone: phone2, station: station2});
    registeringTestCases.push({phone: phone3, station: station1});

    registeringTestCases.forEach(testCase => {
        const {station, phone} = testCase;

        station.registerPhone(phone).then(res => {
            console.log(`Phone ${phone.IMEI} was ${res ? 'successfully' : 'not' } registered on station ${station.name}`);
        });
    });

    station2.showAllThirdGenPhones();

    let callingTestCases: {phone1: CellPhone, phone2: CellPhone, station: BaseStation}[] = [];

    callingTestCases.push({phone1: phone1, phone2: phone2, station: station2});
    callingTestCases.push({phone1: phone1, phone2: phone3, station: station2});
    callingTestCases.push({phone1: phone1, phone2: phone2, station: station1});

    callingTestCases.forEach(testCase => {
        const {station, phone1, phone2} = testCase;

        station.makeCall(phone1, phone2.simCardNumber).then(res => {
            console.log(
                `Phone ${phone1.simCardNumber} ${res ? 'successfully' : 'unsuccessfully' } made call to a ${phone2.simCardNumber} using station ${station.name}`
            );
        });
    });
} catch (e) {
    handleError(e);
}
