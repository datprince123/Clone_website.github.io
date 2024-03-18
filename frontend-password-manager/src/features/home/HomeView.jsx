import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const HomeView = () => {
  const isLoggedIn = true; // Example conditional rendering
  const dispatchApp = useDispatch(state => state.app);
  const app = useSelector(state => state.app)



  return (
    <div className="home-view">
      <h1> Chào mừng {app.email ?  " "+ app.email +" " : " bạn "}  đến với phần mềm quản lý mật khẩu </h1>
    </div>
  );
};

export default HomeView;
