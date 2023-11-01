import CryptoJS from "crypto-js";
import {lightFormat} from "date-fns";

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
        return lightFormat(dateString, 'yyyy-MM-dd H:mm:s');
    }

    const dateArray = dateString.split(/[\/,:\s]+/);
    return `${dateArray[2]}-${dateArray[1].padStart(2, '0')}-${dateArray[0].padStart(2, '0')} ${dateArray[3]}:${dateArray[4]}:${dateArray[5]}`;
}
