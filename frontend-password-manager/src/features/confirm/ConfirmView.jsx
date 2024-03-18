import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from "react-bootstrap-sweetalert";
import { endConfirmation } from './confirmSlice';

const ConfirmView = () => {
  const dispatch = useDispatch();
  const confirm = useSelector(state => state.confirm);
  // const confirmCallback = useSelector((state) => state.confirm.confirmCallback);

  const handleCancelAction = () => {
    confirm.cancelCallback("111");
    dispatch(endConfirmation());
  };

  const handleConfirmAction = () => {
    confirmCallbackFun();

    dispatch(endConfirmation());

  };

  return (
    <SweetAlert
      show={confirm.isConfirming}
      title={confirm.title}
      text="helloxxx"
      // showCancel={true}
      // cancelBtnText={"hehe"}
      confirmBtnText={"Xác nhận"}
      onConfirm={handleConfirmAction}
      onCancel={handleCancelAction}
    >
    </SweetAlert>
  );
};

export default ConfirmView;
