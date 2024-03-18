import React, {useEffect, useState} from 'react';
import '@djthoms/pretty-checkbox';
import {Switch, useCheckboxState} from "pretty-checkbox-react";
import Input from "react-bootstrap-sweetalert/dist/components/Input";
import {Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {fetchBackupMasterKey, fetchRecoveryMasterkey, fetchSaveAccountSetting} from "./settingformSlice";
import { saveAs } from 'file-saver';
import {setShowCheckMasterKey} from "../checkMasterPassword/masterKeySlice";
import {toast} from "react-toastify";
import axios from "axios";



const SettingFormView = () => {
    const  setting = useSelector(state => state.setting)
    const  app = useSelector(state => state.app)
    const dispatch = useDispatch();
    // const [checked, setChecked] = useState(true);
    const [uploadedFileContent, setUploadedFileContent] = useState('');

    const handleCheckboxChange = () => {
        if(setting.enable2FA){
            fetchSaveAccountSetting({enable2FA: false});
        } else {
            fetchSaveAccountSetting({enable2FA: true});
        }
    };

    const createAndDownloadFile = () => {

        if(!app.masterKey){
            dispatch(setShowCheckMasterKey(true));
            return;
        }

        fetchBackupMasterKey(app.masterKey);

    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            // Once the file is read, set its content in the state
            setUploadedFileContent(e.target.result);
            fetchRecoveryMasterkey(e.target.result)


        };


        // Read the file as text
        reader.readAsText(file);

        console.log(file)
    };



    return (
        <div className="container">
            <div className="">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={setting.enable2FA}
                    onChange={handleCheckboxChange}
                    id="2faCheckbox"
                />
                <label className="form-check-label" htmlFor="2faCheckbox">Allow 2FA</label>
            </div>

            <div className="mt-3">
                <button className="btn btn-primary" onClick={createAndDownloadFile}>
                    Sao lưu khóa
                </button>
            </div>

            <div className="mt-3">
                <p className="custom-title">Tải lên bản sao lưu để lấy lại master key </p>
                <input className="form-control" type="file" onChange={handleFileChange}></input>
            </div>

            <div className="mt-3">
                {setting.masterKey? "Masterkey : " + setting.masterKey : "" }
            </div>
        </div>
    );
};

export default SettingFormView;
