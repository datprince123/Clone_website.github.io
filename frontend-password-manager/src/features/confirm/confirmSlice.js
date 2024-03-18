// confirmSlice.js

import { createSlice } from '@reduxjs/toolkit';
import {actions} from "react-bootstrap-sweetalert/dist/styles/SweetAlertStyles";

const defaultCallBack = (() => { console.log(1) }).toString() ;
const initialState = {
  isConfirming: false,
  confirmCallback: defaultCallBack,
  cancelCallback: defaultCallBack,
  title: "hello",
  text: "hello part 2",
  // Other confirmation-related state variables
};



const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    startConfirmation(state, action) {
      state.isConfirming = true;
      console.log(action.payload, "dsdsd")
      // state.confirmCallback = serializeFunction(action.payload.confirmCallback()) || defaultCallBack; // If no callback is passed, set default empty function
      // state.cancelCallback = serializeFunction(action.payload.cancelCallback) || defaultCallBack; // If no callback is passed, set default empty function
      state.title=  action.payload.title;
      // state.text=  action.payload.text;
    },
    endConfirmation(state) {
      state.isConfirming = false;
    },
    // Other reducers to manage confirmation state
  },
});

export const { startConfirmation, endConfirmation } = confirmSlice.actions;
export default confirmSlice.reducer;
