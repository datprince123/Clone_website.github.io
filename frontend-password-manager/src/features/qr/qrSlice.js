// store.js
import { createSlice } from '@reduxjs/toolkit';
import {comopentShow, getSalt} from "../../common/common";
import axios from "axios";
import config from "../../common/server";
import {toast} from "react-toastify";
import store from "../../app/store";
import {setPage} from "../../appSlice";

const qrSlice = createSlice({
    name: 'inputPopup',
    initialState: {
        show: false,
        secret: '',
        email: '',
        appName: ''
    },
    reducers: {
        setShow: (state, action) => {
            console.log("set show");
            state.show = action.payload;
        },
        setData: (state, action) => {
            state.show = true;
            state.secret = action.payload.secret;
            state.email = action.payload.email;
        },


    },
});

export const fetchQr = async ()=>{

    const token = store.getState().app.token;
    console.log(token);

    try {
        const authorization = "Bearer " + token;


        const respone = await axios.get(config.getQr ,
            {
            headers : {
                'Authorization': authorization ,
                'Content-Type': 'application/json'
                // Add more headers if required
            }}
        );
        if (respone.status === 200) {
            store.dispatch(setData(respone.data));
        }
    } catch (e) {
        console.log("err",e)
        // if (e.response.status === 400) {
        //     toast(e.response.data.errors)
        // }
    }

}

export const { setShow, setData } = qrSlice.actions;

export default qrSlice.reducer;


