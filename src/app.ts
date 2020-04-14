import { RegularPhone } from "./classes/Phones/Regular";
import { ThirdGenPhone } from "./classes/Phones/ThirdGen";
import { RegularBaseStation } from "./classes/Stations/Regular";
import { ThirdGenBaseStation } from "./classes/Stations/ThirdGen";
import { CellPhone } from "./interfaces/CellPhone";
import { Contact } from "./interfaces/Contact";
import { BaseStation } from "./interfaces/BaseStation";

const handleError = (e: Error): void => {
    console.error(`[!] En exception occurred while running the app! Details: ${e.message}`);
}

try {
    console.log(`[-] Let's run some examples!`);

    const phone1 = new RegularPhone('777 5555 00 1', '89991305100');
    const phone2 = new ThirdGenPhone('666 6666 66 6', '89171234569');
    const phone3 = new ThirdGenPhone('666 0000 99 9', '');

    const contact1: Contact = {
        firstName: 'Иванов',
        lastName: 'Иван',
        patronymicName: 'Иванович',
        phoneNumber: '89273040500'
    };
    const contact2: Contact = {
        firstName: 'Иванова',
        lastName: 'Мария',
        patronymicName: 'Ивановна',
        phoneNumber: '89271070900'
    };
    const contact3: Contact = {
        firstName: 'Вахрамов',
        lastName: 'Сергей',
        patronymicName: 'Владимирович',
        phoneNumber: '89991305100'
    };

    phone3.addContactToPhoneBook(contact1);
    phone3.addContactToPhoneBook(contact2);
    phone1.addContactToPhoneBook(contact3);

    const station1 = new RegularBaseStation('Regular Station 1');
    const station2 = new ThirdGenBaseStation('3G Station 1');

    let registeringTestCases: {phone: CellPhone, station: BaseStation}[] = [];

    registeringTestCases.push({phone: phone1, station: station2});
    registeringTestCases.push({phone: phone2, station: station2});
    registeringTestCases.push({phone: phone3, station: station1});

    registeringTestCases.forEach(testCase => {
        const {station, phone} = testCase;

        phone.makeConnection(station).then(res => {
            console.log(`Phone ${phone.IMEI} was ${res ? 'successfully' : 'not' } registered on station ${station.name}`);
        });
    });


    setTimeout(() => {
        station2.showAllThirdGenPhones();
    }, 500);


    setTimeout(() => {
        let callingTestCases: {phone1: CellPhone, phone2: CellPhone, station: BaseStation}[] = [];

        callingTestCases.push({phone1: phone1, phone2: phone2, station: station2});
        callingTestCases.push({phone1: phone1, phone2: phone3, station: station2});
        callingTestCases.push({phone1: phone1, phone2: phone2, station: station1});

        callingTestCases.forEach(testCase => {
            const {station, phone1, phone2} = testCase;

            phone1.makeCallByPhoneNumber(phone2.simCardNumber)
                .then(res => {
                    console.log(
                        `Phone ${phone1.simCardNumber} ${res ? 'successfully' : 'unsuccessfully' } made call to ${phone2.simCardNumber}`
                    );
                })
                .catch(error => {
                    console.log(`Error happened while trying to make a phone call from ${phone1.simCardNumber} to ${phone2.simCardNumber}`)
                });


        });

        phone1.makeCallById(1)
            .then(res => {
                console.log(
                    `Phone ${phone1.simCardNumber} ${res ? 'successfully' : 'unsuccessfully' } made call to ${phone1.phoneBook['1'].phoneNumber} using phone book`
                );
            })
            .catch(error => {
                console.log(`Error happened while trying to make a phone call from ${phone1.simCardNumber} to ${phone1.phoneBook['1'].phoneNumber} using phone book`)
            });
    }, 500);
} catch (e) {
    handleError(e);
}
