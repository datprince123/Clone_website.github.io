import axios from "axios";
import config from "../../common/server";
import { toast } from 'react-toastify';
import {comopentShow} from "../../common/common";
import {setMasterKey, setPage,} from "../../appSlice";
import store from "../../app/store";




export const unlockCountdown = async (data) => {
    console.log(data)
    const requestBody = {
        "currentPassword": data.currentPassword,
        "newPassword": data.newPassword
    }

    try {
        const respone = await axios.post(config.unlock ,{email: data.email}  );
        if (respone.status === 200) {
            console.log(respone.data);
            store.dispatch(setPage(comopentShow.LOGIN));
            store.dispatch(setMasterKey({masterKey: data.newMasterKey}))
        }
    } catch (e) {
        if (e.response.status === 400) {
            toast(e.response.data.errors)
        }
    }

}
