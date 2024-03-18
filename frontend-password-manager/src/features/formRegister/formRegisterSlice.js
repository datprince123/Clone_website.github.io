
import axios from "axios";
import config from "../../common/server";

import {comopentShow, getSalt, validatePassword} from "../../common/common"
import {setPage , setRegister} from "../../appSlice";
import store from "../../app/store";
import {toast} from "react-toastify";
import CryptoJS from "crypto-js";


export const doRegister = async (data) => {
    if(validatePassword(data.password) === false){
        toast("Mật khẩu không đúng định dạng")
        return
    }

    const requestBody = {
        email : data.email,
        password : data.password,
        salt : CryptoJS.lib.WordArray.random(128/8).toString(),
    }
    try {
        const respone = await axios.post(config.registerUrl, requestBody);
        if (respone.status === 200) {
            toast("Check email")
            store.dispatch(setPage(comopentShow.LOGIN));
        }
    } catch (e) {
        if (e.response.status === 400) {
            toast(e.response.data.errors)
        }
    }

}
