
import axios from "axios";
import config from "../../common/server";

import {comopentShow, getSalt, validatePassword} from "../../common/common"
import {setMasterKey, setPage, setRegister, setToken} from "../../appSlice";
import store from "../../app/store";
import {toast} from "react-toastify";


export const doSetupMasterKey = async (data) => {

  if(validatePassword(data) === false){
    toast("MasterPassword không đúng định dạng")
    return
  }

  console.log(data,"data")
  const masterKey = encodeURIComponent(data);
  console.log(store.getState().app.token)
  const requestBody = {
    masterKey : data,
  }
  try {
    const authorization = "Bearer " + store.getState().app.token;
    const respone = await axios.post(config.masterKeyUrl,{

      },
      {
        headers : {
          'Authorization': authorization ,
          'Content-Type': 'application/json'
        },
        params: {
          masterKey: masterKey
        }
      }
    );
    if (respone.status === 200) {
      toast("Thêm MasterPassword thành công ");
      store.dispatch(setMasterKey(data));
      store.dispatch(setPage(comopentShow.HOME));
    }
  } catch (e) {
    if (e.response.status === 400) {
      toast(e.response.data.errors)
    } else{
      toast(e.response.data.errors)
    }
  }
}


export const doCheckMasterKey = async (data) => {
  console.log(data,"data")
  console.log(store.getState().app.token)
  const masterKey = encodeURIComponent(data);

  try {
    const authorization = "Bearer " + store.getState().app.token;
    const respone = await axios.get(config.checkMasterKeyUrl +"?masterKey="+ masterKey ,
      {
        headers : {
          'Authorization': authorization ,
          'Content-Type': 'application/json'
          // Add more headers if required
        }}
    );
    if (respone.status === 200) {
      toast("MasterPassword chính xác " );
      store.dispatch(setMasterKey({masterKey: data}));
    }
  } catch (e) {
    if (e.response.status === 400) {
      toast(e.response.data.errors)
    } else{
      toast(e.response.data.errors)

    }
  }

}



