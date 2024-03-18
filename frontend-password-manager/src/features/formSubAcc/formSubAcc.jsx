import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from "react-redux";
// import {setPage} from "../../appSlice";
// import {comopentShow} from "../common/common";
import {toast} from "react-toastify";
import {setShow} from "./formSubAccSlice";

const  FormOtp = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        // doFetchOtp(values);
    };

    // toast.error(" Login error ")

    const validate = (values) => {
        const errors = {};

        // if (!values.email) {
        //     errors.email = 'Required';
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        //     errors.email = 'Email không hợp lệ';
        // }

        // if (!values.password) {
        //     errors.password = 'Required';
        // } else if( !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password)  ){
        //     errors.password = 'Mật khẩu không hợp lệ, yêu cầu ít nhấ 8 ký tự trong đó có 1 ký tư hoa 1 số ';
        // }

        return errors;
    };


    return (

        <div className="container mt-5 rounded border border-3  p-3 ">
            <h1> Nhập OTP (google authenticator app)</h1>

            <Formik
                initialValues={{otp: ''}}
                validate={validate}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="row mb-3">
                        <label htmlFor="email" className="col-auto col-form-label">OTP</label>
                        <div className="col">
                            <Field type="text" name="otp" placeholder="Nhập otp" className="form-control"/>
                        </div>
                        <ErrorMessage name="email" component="div" className="text-danger"/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <div/>
                    <a className="nav-link text-decoration-underline text-primary " onClick={() => {
                        dispatch(setShow(false))
                    }}> Hủy </a>
                </Form>
            </Formik>
        </div>
        )
    ;
};

export default FormOtp;
