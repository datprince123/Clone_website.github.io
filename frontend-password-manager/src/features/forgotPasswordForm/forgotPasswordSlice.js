import axios from "axios";
import config from "../../common/server";
import { toast } from 'react-toastify';
import {comopentShow, validatePassword} from "../../common/common";
import {setMasterKey, setPage,} from "../../appSlice";
import store from "../../app/store";




export const forgotPassword = async (data) => {
    if(validatePassword(data.password) === false){
        toast("Mật khẩu không đúng định dạng")
        return
    }


    console.log(data)
    const requestBody = {
        "email": data.email,
        "newPassword": data.newPassword
    }

    try {

        const respone = await axios.post(config.forgotPassword ,requestBody );
        window.alert("fetch success")
        if (respone.status === 200) {
            console.log(respone.data);
            store.dispatch(setPage(comopentShow.LOGIN));
        }
    } catch (e) {
        window.alert("fetch success")
        console.log("erer", e)
        if (e.response.status === 400) {
            toast(e.response.data.errors)
        }
    }

}
