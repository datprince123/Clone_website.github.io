import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "./forgotPasswordSlice";
import {setPage} from "../../appSlice";
import {comopentShow} from "../../common/common";

const ForgotPasswordView = () => {
    const dispatch = useDispatch();

    const handleSubmit=  (values) => {
        forgotPassword(values);
    };


    const validate = (values) => {
        const errors = {};
        return errors;
    };



    return (
        <div className="container mt-5 rounded border border-3  p-3 ">
            <h1> Quên mật khẩu </h1>

            <Formik
                initialValues={{email: '', newPassword: ''}}
                validate={validate}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="row mb-3">
                        <label htmlFor="email" className="col-auto col-form-label">Email</label>
                        <div className="col">
                            <Field type="text" name="email" placeholder="Nhập email "
                                   className="form-control"/>
                        </div>
                        <ErrorMessage name="email" component="div" className="text-danger"/>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="newPassword" className="col-auto col-form-label">Mật khẩu mới</label>
                        <div className="col">
                            <Field type="password" name="newPassword" placeholder="Password moi"
                                   className="form-control"/>
                        </div>
                        <ErrorMessage name="newPassword" component="div" className="text-danger"/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>

                    <a className="nav-link text-decoration-underline text-primary " onClick={() => {
                        dispatch(setPage(comopentShow.LOGIN))
                    }}>Đăng nhập </a>

                    <div/>
                </Form>

            </Formik>
        </div>
    );
};

export default ForgotPasswordView;
