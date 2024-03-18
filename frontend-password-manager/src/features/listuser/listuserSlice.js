
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from "../../common/server";
import store from "../../app/store";
import {toast} from "react-toastify";
const initialState = {
    data: [],
}

// Generates pending, fulfilled and rejected action types
export const fetchSubUser = async ()=>{

    const token = store.getState().app.token;
    console.log(token);

    try {
        const authorization = "Bearer " + token;


        const respone = await axios.get(config.userList ,
            {
                headers : {
                    'Authorization': authorization ,
                    'Content-Type': 'application/json'
                    // Add more headers if required
                }}
        );
        if (respone.status === 200) {
            console.log(Array.isArray(respone.data))
            console.log(Array.from(respone.data))
            store.dispatch(setSubUserData(respone.data));
        }
    } catch (e) {
        console.log("err",e.response.status)
    }

}


export const fetchEditSubUser = async (data)=>{

    const token = store.getState().app.token;
    console.log(data);
    try {
        const authorization = "Bearer " + token;
        const requestBody = {
            "id" :data.id,
            "isActive": data.isActive,
        };

        const respone = await axios.put(config.userDetail ,requestBody,
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
            fetchSubUser();
            toast("thành công ")
        }
    } catch (e) {
        console.log("err",e.response.status)
        toast("Thất bại ")

    }



}

export const fetchRemoveCountDown = async (email)=>{

    const token = store.getState().app.token;

    try {
        const authorization = "Bearer " + token;

        const respone = await axios.put(config.removeCountdown ,{},
            {
                headers : {
                    'Authorization': authorization ,
                    'Content-Type': 'application/json'
                    // Add more headers if required
                },
                params :{ email : email}

            },
        );
        if (respone.status === 200) {
            console.log(respone.data);
            fetchSubUser();
            toast("Thành công ")
        }
    } catch (e) {
        console.log("err",e.response.status)
        toast("Thất bại ")

    }



}





const subUserSlice = createSlice({
    name: 'meclgt',
    initialState,
    reducers: {
        setSubUserData: (state, action) => {
            state.data =  action.payload;
            },

    },
})

export const { setSubUserData } = subUserSlice.actions;

export default subUserSlice.reducer
