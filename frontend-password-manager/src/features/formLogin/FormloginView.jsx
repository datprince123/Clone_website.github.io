import React, {useRef, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from "react-redux";
import  {doLogin} from "./formLogin";
import {setPage} from "../../appSlice";
import {comopentShow} from "../../common/common";

const FormLogin = () => {
    const dispatch = useDispatch();
  const [recaptchaValue, setRecaptchaValue] = useState('');

    const handleSubmit=  (values) => {
        doLogin(values);
    };
  const captchaRef = useRef()
  const onChange = value => {
    console.log("value", value)
    setRecaptchaValue(value);
  }

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Email không hợp lệ';
        }

        // if (!values.password) {
        //     errors.password = 'Required';
        // } else if( !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password)  ){
        //     errors.password = 'Mật khẩu không hợp lệ, yêu cầu ít nhấ 8 ký tự trong đó có 1 ký tư hoa 1 số ';
        // }

        return errors;
    };



    return (
        <div className="container mt-5 rounded border border-3  p-3 ">
            <h1> Đăng nhập </h1>
          <Formik
            initialValues={{email: '', password: ''}}
            validate={validate}
            onSubmit={handleSubmit}
          >
              <Form>

                  <div className="row mb-3">
                      <label htmlFor="email" className="col-auto col-form-label">Tài Khoản</label>
                      <div className="col">
                          <Field type="email" name="email" placeholder="Nhập email" className="form-control"/>
                      </div>
                      <ErrorMessage name="email" component="div" className="text-danger"/>
                  </div>
                  <div className="row mb-3">
                      <label htmlFor="password" className="col-auto col-form-label">Mật khẩu</label>
                      <div className="col">
                          <Field type="password" name="password" placeholder="Nhập mật khẩu"
                                 className="form-control"/>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-danger"/>
                  </div>

                  <div className="row justify-content-center">
                      <div className="col-md-3">
                          <div className='form-group mt-2 text-center'>
                          </div>
                      </div>
                  </div>


                  <button type="submit" className="btn btn-primary">
                      Submit
                  </button>
                  <div/>
                  <a className="nav-link text-decoration-underline text-primary " onClick={() => {
                      dispatch(setPage(comopentShow.REGISTER))
                  }}>Bạn chưa có tài khoản , đăng ký ngay ? </a>

                  <a className="nav-link text-decoration-underline text-primary " onClick={() => {
                      dispatch(setPage(comopentShow.FROM_FORGOT_PASSWORD))
                  }}>Quên mật khẩu ? </a>
                  <a className="nav-link text-decoration-underline text-primary " onClick={() => {
                      dispatch(setPage(comopentShow.FROM_UNLOCK_COUNTDOWN))
                  }}>Tài khoản bị khóa ? </a>

              </Form>

          </Formik>
        </div>
    )
        ;
};

export default FormLogin;
