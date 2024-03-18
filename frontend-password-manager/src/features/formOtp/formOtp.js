import axios from "axios";
import config from "../../common/server";
import { toast } from 'react-toastify';
import {comopentShow, getSalt, status} from "../../common/common";
import {doGetUserInfo, setPage, setToken} from "../../appSlice";
import store from "../../app/store";




export const doFetchOtp = async (data) => {
    console.log(data,"data")
    console.log(store.getState().app.token)
    const requestBody = {
        otp : data.otp,
        token : store.getState().app.token,
    }
    try {
        const respone = await axios.post(config.loginValidateUrl, requestBody);
        if (respone.status === 200) {
            toast("đăng nhập thành công");
            store.dispatch(setToken(respone.data))
            window.localStorage.setItem("token", respone.data);
            doGetUserInfo();
        }
    } catch (e) {
        if (e.response.status === 400) {
            toast(e.response.data.errors)
        } else{
            toast(e.response.data.errors)

        }
    }

}




