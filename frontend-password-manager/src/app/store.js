import { configureStore } from '@reduxjs/toolkit'
import cakeReducer from '../features/cake/cakeSlice'
import icecreamReducer from '../features/icecream/icecreamSlice'
import appReducer from '../appSlice'
import qrReducer from "../features/qr/qrSlice";
import subAccountReducer from "../features/listSubAcc/listSubAccSlice"
import formSubAccReduce from "../features/formSubAcc/formSubAccSlice";
import confirmReduce from "../features/confirm/confirmSlice";
import checkMasterKeyReducer from "../features/checkMasterPassword/masterKeySlice"
import settingReducer from "../features/settingForm/settingformSlice";
import listUserReducer from "../features/listuser/listuserSlice"

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    app: appReducer,
    qr : qrReducer,
    subAccount : subAccountReducer,
    formSubAcc :formSubAccReduce,
    confirm: confirmReduce,
    checkMasterKey : checkMasterKeyReducer,
    setting : settingReducer,
    user : listUserReducer,
  }
})

export default store

