import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch} from "react-redux";
import {unlockCountdown} from "./unlockCountdownSlice";
import {setPage} from "../../appSlice";
import {comopentShow} from "../../common/common";

const UnlockCountdownView = () => {
    const dispatch = useDispatch();

    const handleSubmit=  (values) => {
        unlockCountdown(values);
    };


    const validate = (values) => {
        const errors = {};
        return errors;
    };



    return (
        <div className="container mt-5 rounded border border-3  p-3 ">
            <h1> Mở khóa tài khoản </h1>

            <Formik
                initialValues={{email: ''}}
                validate={validate}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="row mb-3">
                        <label htmlFor="email" className="col-auto col-form-label">Email</label>
                        <div className="col">
                            <Field type="text" name="email" placeholder="Nhập emai " className="form-control"/>
                        </div>
                        <ErrorMessage name="email" component="div" className="text-danger"/>
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

export default UnlockCountdownView;
