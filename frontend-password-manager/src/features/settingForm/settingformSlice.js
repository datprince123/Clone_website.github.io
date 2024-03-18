import { createSlice } from '@reduxjs/toolkit'
import { ordered as cakeOrdered } from '../cake/cakeSlice'
import store from "../../app/store";
import {comopentShow, encrypt} from "../../common/common";
import axios from "axios";
import config from "../../common/server";
import {fetchSubAccount} from "../listSubAcc/listSubAccSlice";
import {setPage} from "../../appSlice";

const initialState = {
    enable2FA : false,
    masterKey: null,
    masterKeyEnc: null,
}

const SettingFormSlice = createSlice({
    name: 'SettingForm',
    initialState,
    reducers: {
        setEnable2FA: (state, action) => {
            // Simulating a login action - setting loggedIn to true and storing the user data
            state.enable2FA = action.payload;
        },
        setMasterKey: (state, action) => {
            // Simulating a login action - setting loggedIn to true and storing the user data
            state.masterKey = action.payload;
        },
        setMasterKeyEnc: (state, action) => {
            // Simulating a login action - setting loggedIn to true and storing the user data
            state.masterKeyEnc = action.payload;
        },
    }

})

export const { setEnable2FA ,setMasterKey} = SettingFormSlice.actions
export default SettingFormSlice.reducer

export const fetchSaveAccountSetting = async (data)=>{

    const token = store.getState().app.token;
    console.log(token);

    try {
        const authorization = "Bearer " + token;
        const requestBody =
            {
                "enable2FA": data.enable2FA,
                "receiveEmailNotification": false,
                "allowRecoveryMasterKey": false,
            }

        console.log(requestBody);
        // return
        const respone = await axios.put(config.editAccountSetting ,{} ,
            {
                headers : {
                    'Authorization': authorization ,
                    'Content-Type': 'application/json'
                    // Add more headers if required
                },
                params : requestBody
            },
        );
        if (respone.status === 200) {
            console.log(respone.data);
            fetchGetAccountSetting()            // store.dispatch(setData(respone.data));
        }
    } catch (e) {
        console.log("err",e.response.status)
    }
}



export const fetchGetAccountSetting = async ()=>{

    const token = store.getState().app.token;
    console.log(token);

    try {
        const authorization = "Bearer " + token;

        // return
        const respone = await axios.get(config.getAccountSetting ,
            {
                headers : {
                    'Authorization': authorization ,
                    'Content-Type': 'application/json'
                    // Add more headers if required
                },
            },
        );
        if (respone.status === 200) {
            console.log(respone.data);
            store.dispatch(setPage(comopentShow.FORM_SETTING));
            store.dispatch(setEnable2FA(respone.data.enable2FA))

        }
    } catch (e) {
        console.log("err",e)
    }
}


export const fetchBackupMasterKey = async (data)=>{

    const token = store.getState().app.token;
    console.log(token);

    try {
        const authorization = "Bearer " + token;

        // return
        const respone = await axios.get(config.backupMasterKey ,
            {
                headers : {
                    'Authorization': authorization ,
                    // 'Content-Type': 'application/json'
                    // Add more headers if required
                },
                params : {
                    masterkey : data
                }
            },
        );
        if (respone.status === 200) {
            console.log(respone.data);
            const fileBlob = new Blob([respone.data], { type: 'text/plain;charset=utf-8' });

            // Use FileSaver.js to save the Blob as a file
            saveAs(fileBlob, 'masterkey.key');

        }
    } catch (e) {
        console.log("err",e)
        return undefined;
    }
}

export const fetchRecoveryMasterkey = async ( data)=>{

    const token = store.getState().app.token;
    console.log(data);

    try {
        const authorization = "Bearer " + token;

        // return
        const respone = await axios.get(config.recoveryMasterkey ,
            {
                headers : {
                    'Authorization': authorization ,
                    // 'Content-Type': 'application/json'
                    // Add more headers if required
                },
                params :{
                    masterkeyEnc : data
                }
            },
        );
        if (respone.status === 200) {
            console.log(respone.data);
            store.dispatch(setMasterKey(respone.data))
        }
    } catch (e) {
        console.log("err",e)
    }
}
