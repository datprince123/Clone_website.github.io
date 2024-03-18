import {createSlice} from "@reduxjs/toolkit";
import store from "../../app/store";
import axios from "axios";
import config from "../../common/server";
import {toast} from "react-toastify";
import {setMasterKey} from "../../appSlice";
import {validatePassword} from "../../common/common";

const initialState = {
  show : false

}
const checkMasterKeySlice = createSlice({
    name: 'formCheckMasterKey',
    initialState,
    reducers: {
        setShowCheckMasterKey: (state, action) => {
            console.log(action.payload)
            // Simulating a login action - setting loggedIn to true and storing the user data
            state.show = action.payload;
        }
    },
});


export const doCheckMasterKey = async (data) => {

    if(validatePassword(data) === false){
        toast("MasterPassword không đúng định dạng")
        return
    }


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
      toast("MasterPassword chính xác" );
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


export const { setShowCheckMasterKey } = checkMasterKeySlice.actions;

export default checkMasterKeySlice.reducer;
