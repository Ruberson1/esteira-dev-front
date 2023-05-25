import CryptoJS from "crypto-js";
import {format} from "date-fns";

export const encrypt = (object, key) => {
    const string = JSON.stringify(object);
    return CryptoJS.AES.encrypt(string, key).toString();
};

export const decrypt = (encryptedString, key) => {
    const decryptString = CryptoJS.AES.decrypt(encryptedString, key);
    const string = decryptString.toString(CryptoJS.enc.Utf8);
    return JSON.parse(string);
};

export function formatDate(dateString) {
    if (typeof dateString !== 'string') {
       dateString = format(dateString, 'dd-MM-yyyy')
    }

    const dateArray = dateString.split('-');
    const date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    return date.toISOString().slice(0, 10);
}