import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import {useDispatch, useSelector} from "react-redux";
import {fetchEditSubUser, fetchRemoveCountDown, fetchSubUser} from "./listuserSlice";
import {setShow} from "../formSubAcc/formSubAccSlice";
import SweetAlert from "react-bootstrap-sweetalert";
import {decrypt} from "../../common/common";
import {setShowCheckMasterKey} from "../checkMasterPassword/masterKeySlice";
import {fetchSubAccount} from "../listSubAcc/listSubAccSlice";

export const ListUserView = () =>
{
    const columns= [
        {
            name:"Id",
            selector:(row)=><div>{row.id}</div> ,
            width: '50px',
        },
        {
            name: "email",
            selector: (row) => <div>{row.email}</div>
        },

        {
            name:"Trạng thái",
            selector:(row)=>(
                <button className="btn"  onClick={() => {handleChangeStatus(row.id, row.isActive)}}>{row.isActive ?" Đang hoạt động" : "Bị Khóa " }</button>)
        },
        {
            name:"Hành động ",
            cell:(row)=>(
                <button onClick={() => { handleClearCountdown(row.email)}} className="btn" >
                    Mở khóa thời gian login
                </button>),
        },
    ];



    const [id, setID] = useState(null); // Initialize with null
    const [email, setEmail] = useState(null); // Initialize with null
    const [isActive, setIsActive] = useState(null); // Initialize with null
    const user = useSelector(state => state.user)
    const app = useSelector(state => state.app)

    const dispatch = useDispatch();
    const [search, SetSearch]= useState('');
    const [action, setAction]= useState();
    const [title, SetTitle]= useState('');
    const [showConfirm, setShowConfirm]= useState(false);

    const [filter, setFilter]= useState([]);
    //

    useEffect(()=>{
        fetchSubUser();
    }, []);

    useEffect(()=>{
        console.log("data" ,user.data);

        const result = user.data.filter((item) => {
            return item.email.toLowerCase().includes(search.toLowerCase());
        });

        setFilter(result);
    }, [search, user.data]);

    const handleChangeStatus = (id, isActive) => {
        setAction(1);
        setIsActive(isActive);
        SetTitle("Xác nhận thay đổi trạng thái ?")
        setShowConfirm(true);
        setID(id)
    }

    const handleChangeStatusConfirm  = () => {
        setShowConfirm(false);
        if (true === isActive) {
            fetchEditSubUser({id: id, isActive: false})
        } else {
            fetchEditSubUser({id: id, isActive: true})
        }
    }
    const handleClearCountdown = (email) => {
        setAction(2)
        SetTitle("Xác nhận xóa bộ đếm thời gian login ?")
        setEmail(email);
        setShowConfirm(true);

    }


    const handleClearCountdownConfirm  = () => {
        setShowConfirm(false);
        fetchRemoveCountDown(email);
    }
    const confirmAction=(callback)=>{
        callback();
        // fetchDeleteSubAccount(deleteID);
        setShowConfirm(false);
    }

    const cancelAction=(val)=>{
        setShowConfirm(false)
    }


    const tableHeaderstyle={
        headCells:{
            style:{
                fontWeight:"bold",
                fontSize:"14px",
                backgroundColor:"#ccc"

            },
        },
    }
    const handleRowSelectedChange = (data) => {
        console.log(data.selectedRows.map(row=>row.id));
    };

    const style = {
        width: '70px',
    };


    return(
        <div className="container"> Tổng {user.data.length}
            <div className="row container">

                <div className="col-md-4 text-end">

                    <input type="text"
                           className="p-2  form-control"
                           placeholder="Tìm kiếm ..."
                           value={search}
                           onChange={(e) => SetSearch(e.target.value)}/>
                </div>
            </div>
            <br/>
            <SweetAlert
                show={showConfirm}
                warning
                showCancel
                cancelBtnText="Chờ đã  "
                cancelBtnBsStyle="light"
                confirmBtnText="Đồng ý "
                confirmBtnBsStyle="danger"
                title={title}
                onConfirm={action === 1 ? handleChangeStatusConfirm : handleClearCountdownConfirm}
                onCancel={cancelAction}
                focusCancelBtn
            >
                Bạn có chắc chắn ?
            </SweetAlert>
            <DataTable
                onSelectedRowsChange={handleRowSelectedChange}
                customStyles={tableHeaderstyle}
                columns={columns}
                data={filter}
                pagination
                // selectableRows
                fixedHeader
                paginationComponentOptions={{rowsPerPageText: "Số tài khoản trên 1 trang"}}
                selectableRowsHighlight
                highlightOnHover
                paginationPerPage={10}
            />

        </div>


    );
}

export default ListUserView;
