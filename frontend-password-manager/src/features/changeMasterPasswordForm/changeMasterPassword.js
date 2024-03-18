import axios from "axios";
import config from "../../common/server";
import { toast } from 'react-toastify';
import {comopentShow, validatePassword} from "../../common/common";
import {setMasterKey, setPage,} from "../../appSlice";
import store from "../../app/store";




export const changeMasterPassword = async (data) => {
    console.log(data)


    if(validatePassword(data.newMasterKey)  === false || validatePassword(data.currentMasterKey) ){
        toast("MasterPassword không đúng định dạng")
        return
    }

    const requestBody = {
        "currentMasterPassword": data.currentMasterKey,
        "newMasterPassword": data.newMasterKey
    }

    try {
        const authorization = "Bearer " + store.getState().app.token;

        const respone = await axios.put(config.changeMasterKey ,requestBody ,
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
            toast("Đổi thành công ")
            store.dispatch(setPage(comopentShow.HOME));
            store.dispatch(setMasterKey({masterKey: data.newMasterKey}))
        }
    } catch (e) {
        if (e.response.status === 400) {
            toast("Đổi thất bại ")
            toast(e.response.data.errors)
        }
    }

}
