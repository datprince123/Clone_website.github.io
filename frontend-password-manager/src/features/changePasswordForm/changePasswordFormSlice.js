import axios from "axios";
import config from "../../common/server";
import { toast } from 'react-toastify';
import {comopentShow, validatePassword} from "../../common/common";
import {setMasterKey, setPage,} from "../../appSlice";
import store from "../../app/store";




export const changePassword = async (data) => {

    if(validatePassword(data.newPassword) === false){
        toast("Mật khẩu không đúng định dạng")
        return
    }


    console.log(data)
    const requestBody = {
        "currentPassword": data.currentPassword,
        "newPassword": data.newPassword
    }

    try {
        const authorization = "Bearer " + store.getState().app.token;

        const respone = await axios.put(config.changePassword ,requestBody ,
            {
                headers : {
                    'Authorization': authorization ,
                    'Content-Type': 'application/json'
                    // Add more headers if required
                },
            },
        );
        if (respone.status === 200) {
            toast("Đổi mật khaảu thành công ")
            store.dispatch(setPage(comopentShow.HOME));
            store.dispatch(setMasterKey({masterKey: data.newMasterKey}))
        }
    } catch (e) {
        if (e.response.status === 400) {
            toast(e.response.data.errors)
        }
    }

}
