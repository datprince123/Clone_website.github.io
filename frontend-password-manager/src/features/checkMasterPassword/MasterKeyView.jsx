import {useDispatch, useSelector} from "react-redux";

import React, {useState} from 'react';
import {doCheckMasterKey, setShowCheckMasterKey} from "./masterKeySlice";
import SweetAlert from "react-bootstrap-sweetalert";

const CheckMasterKey = () => {
    const dispatch = useDispatch()
    const[inputValue, setInputValue]= useState({masterKey: ''});
    const checkMasterKey = useSelector(state => state.checkMasterKey)

    const handleInput= (e)=>{
        setInputValue({ masterKey: e.target.value});
        console.log(e.target.value);
    }
    const handleConfirm=()=>{
      doCheckMasterKey(inputValue.masterKey);
      dispatch(setShowCheckMasterKey(false))
      setInputValue({ masterKey: ''});
    }

    const closePopup = () => {
      dispatch(setShowCheckMasterKey(false))
    }
    return (


  <div>
    <SweetAlert
      show={checkMasterKey.show}
      title="Nhập master password"
      showCancel={false}
      confirmBtnText="Xác nhận"
      onConfirm={handleConfirm}
      onCancel={closePopup}
    >
      <form className="input-wrapper" onSubmit={handleConfirm}>
        {/*<lable*/}
        {/*     className="col-sm-3 col-formLogin-lable">{app.masterKey ? "bạn đã nhập checkMasterPassword rồi, nhập lại để thay đổi " : " Mời bạn nhập checkMasterPassword"}</lable>*/}
        <input type="text" className="p-2  form-control"
               placeholder={" Mời bạn nhập MasterPassword"}
               value={inputValue.masterKey} onChange={handleInput}/>
      </form>

    </SweetAlert>
  </div>


    )
      ;
};

export default CheckMasterKey;
