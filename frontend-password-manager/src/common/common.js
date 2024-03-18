import CryptoJS from 'crypto-js'
import store from "../app/store";
import {toast} from "react-toastify";


export const status = {
    SHOW : 'SHOW',
    HIDE : 'HIDE',
    SUCCESS : 'SUCCESS',
    ERROR : 'ERROR'

}

export const popUpType = {
  qr : 'QR',
  otp : 'OTP',
}

export const comopentShow = {
    LOGIN : 'LOGIN',
    REGISTER: 'REGISTER',
    ALL_SUB_ACCOUNT : 'ALL_SUB_ACCOUNT',
    SUB_ACCOUNT : 'SUB_ACCOUNT',
    HOME : "HOME",
    OTP_FORM : "OTP_FORM",
    EDIT_ACCOUNT : "EDIT_ACCOUNT",
    FORM_SET_MASTER_KEY : "MASTER_KEY",
    FORM_SETTING : "FROM_SETTING",
    FROM_CHANGE_MASTER_KEY : "FROM_CHANGE_MASTER_KEY",
    FROM_CHANGE_PASSWORD : "FROM_CHANGE_PASSWORD",
    FROM_FORGOT_PASSWORD : "FROM_FORGOT_PASSWORD",
    FROM_UNLOCK_COUNTDOWN : "FROM_UNLOCK_COUNTDOWN",
}


export function getSalt(length){
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const regexPasswpr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{12,}$/;


// Code goes here
const keySize = 256;
const ivSize = 128;
const iterations = 100;

const message = "alobansdjs"
const password = "Secret Password";


export function encrypt (msg) {
    // const salt = CryptoJS.lib.WordArray.random(128/8);

    const salt = CryptoJS.enc.Hex.parse(store.getState().app.salt);
    const pass = store.getState().app.masterKey


    if(!pass){
        toast("chưa nhập master key")
    }
    const key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
    });
    console.log(key)


    const iv = CryptoJS.lib.WordArray.random(ivSize/8);
    console.log("iv", iv);

    const encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        // padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CTR,
    });

    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    const transitmessage =  iv.toString() + encrypted.toString();
    return transitmessage;
}

export function decrypt (transitmessage) {
    const salt = CryptoJS.enc.Hex.parse(store.getState().app.salt);
    const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32))
    const encrypted = transitmessage.substring(32);
    const pass = store.getState().app.masterKey;
    if(!pass){
        toast("chưa nhập master key")
    }
    const key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize /32   ,
        iterations: iterations,

    });
    console.log(key)
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        // padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CTR,
    })
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export function generateSafePassword() {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_-+=<>?';

    const allCharacters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

    const passwordLength = 12;
    let password = '';

    password += getRandomCharacter(uppercaseLetters);
    password += getRandomCharacter(lowercaseLetters);
    password += getRandomCharacter(numbers);
    password += getRandomCharacter(specialCharacters);

    for (let i = password.length; i < passwordLength; i++) {
        password += getRandomCharacter(allCharacters);
    }

    password = shuffleString(password);

    return password;
}

function getRandomCharacter(characters) {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    const randomIndex = randomValues[0] % characters.length;
    return characters.charAt(randomIndex);
}

function shuffleString(string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}


export const validatePassword =  (password) => {
    return regexPasswpr.test(password);
}
