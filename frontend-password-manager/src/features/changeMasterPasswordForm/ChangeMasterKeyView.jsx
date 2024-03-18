import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {changeMasterPassword} from "./changeMasterPassword";

const ChangeMasterKeyVieW = () => {
    const dispatch = useDispatch();

    const handleSubmit=  (values) => {
        changeMasterPassword(values);
    };


    const validate = (values) => {
        const errors = {};
        return errors;
    };



    return (
        <div className="container mt-5 rounded border border-3  p-3 ">
            <h1> Đổi master password </h1>

            <Formik
                initialValues={{currentMasterKey: '', newMasterKey: ''}}
                validate={validate}
                onSubmit={handleSubmit}
            >
                <Form >
                    <div className="row mb-3">
                        <label htmlFor="currentMasterKey" className="col-auto col-form-label">MasterPassword</label>
                        <div className="col">
                            <Field type="text" name="currentMasterKey" placeholder="Masterpassword hiện tại" className="form-control"/>
                        </div>
                        <ErrorMessage name="currentMasterKey" component="div" className="text-danger"/>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="newMasterKey" className="col-auto col-form-label">MasterPassword mới</label>
                        <div className="col">
                            <Field type="text" name="newMasterKey" placeholder="MasterPassword moi"
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

export default ChangeMasterKeyVieW;
