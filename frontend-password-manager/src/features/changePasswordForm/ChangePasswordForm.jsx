import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "./changePasswordFormSlice";

const ChangePasswordVieW = () => {
    const dispatch = useDispatch();

    const handleSubmit=  (values) => {
        changePassword(values);
    };


    const validate = (values) => {
        const errors = {};
        return errors;
    };



    return (
        <div className="container mt-5 rounded border border-3  p-3 ">
            <h1> Đổi mật khẩu </h1>

            <Formik
                initialValues={{currentPassword: '', newPassword: ''}}
                validate={validate}
                onSubmit={handleSubmit}
            >
                <Form >
                    <div className="row mb-3">
                        <label htmlFor="currentPassword" className="col-auto col-form-label">Mật khẩu hiện tại </label>
                        <div className="col">
                            <Field type="text" name="currentPassword" placeholder="Password hiện tại" className="form-control"/>
                        </div>
                        <ErrorMessage name="currentPassword" component="div" className="text-danger"/>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="newPassword" className="col-auto col-form-label">Mật khẩu mới</label>
                        <div className="col">
                            <Field type="text" name="newPassword" placeholder="Password mới "
                                   className="form-control"/>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-danger"/>
                    </div>
                    <button type="submit"  className="btn btn-primary">
                        Submit
                    </button>
                    <div/>
                </Form>

            </Formik>
        </div>
    );
};

export default ChangePasswordVieW;
