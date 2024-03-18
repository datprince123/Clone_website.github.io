import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import config from "../../common/server";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubAccount, fetchDeleteSubAccount, fetchAddSubAccount, fetchEditSubAccount} from "./listSubAccSlice";
import data from "bootstrap/js/src/dom/data";
import {setShow} from "../formSubAcc/formSubAccSlice";
import {startConfirmation} from "../confirm/confirmSlice";
import SweetAlert from "react-bootstrap-sweetalert";
import {ErrorMessage, Field, Form, Formik} from "formik";
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from 'react-icons/ri';

import {decrypt, generateSafePassword} from "../../common/common";
import {setShowCheckMasterKey} from "../checkMasterPassword/masterKeySlice";

export const ListSubAccView = () =>
{
  const columns= [
    {
      name:"Id",
      selector:(row)=><div onClick={()  => editSubAccountClick(row.id)}>{row.id}</div> ,
      width: '50px',
    },
    {
      name: "Url",
      selector: (row) => <div onClick={()  => editSubAccountClick(row.id)}>{row.url}</div>
    },
    {
      name: "Mô tả ",
      selector: (row) => <div onClick={()  => editSubAccountClick(row.id)}>{row.desc}</div>,
    },
    {
      name: "Tài Khoản",
      selector: (row) => <div onClick={()  => editSubAccountClick(row.id)}>{row.subUserName}</div>,
    },
    {
      name:"Mật Khẩu",
      cell:(row)=>(
          <div>{row.password ? row.password : "*******"}</div>)
    },
    {
      name:"",
      cell:(row)=>(
        <RiDeleteBin6Line onClick={()=>handleDelete(row.id)}>

        </RiDeleteBin6Line>),
      width: "50px"
    },
  ];
  const [deleteID, setDeleteID] = useState(null); // Initialize with null
  const [deleteIDList, setDeleteIDList] = useState([]); // Initialize with null
  const subAccount = useSelector(state => state.subAccount)
  const app = useSelector(state => state.app)

  const dispatch = useDispatch();
  const [search, SetSearch]= useState('');
  const [showDeleteConfirm, setShowDeleteConfirm]= useState(false);
  const [addFormShow ,setAddFromShow]= useState(false);
  const [editFormShow ,setEditFromShow]= useState(false);
  const [filter, setFilter]= useState([]);
  //
  const [subAccountInfo,setSubAccountInfo] =useState({
    add : true,
    id : '11',
    url : 'aaa',
    desc : 'bbb',
    username: 'cc',
    password: 'dd',
    title: 'Thêm mới tài khoản !',
  })

  const addSubAccountClick = () =>{
    if(!app.masterKey){
      dispatch(setShowCheckMasterKey(true));
      return;
    }

    setSubAccountInfo({
      add : true,
      id : '',
      url : app.currentUrl,
      desc : '',
      username: '',
      password: generateSafePassword(),
      title: 'Thêm mới tài khoản !',
    })
    setEditFromShow(true);
  }

  const editSubAccountClick = (id) =>{
    if(!app.masterKey){
      dispatch(setShowCheckMasterKey(true));
      return;
    }

    const data = subAccount.data.find((item) =>{
      if(item.id === id){
        return item;
      };
    })

    setSubAccountInfo({
      add : false,
      id : data.id,
      url : data.url,
      desc :data.desc,
      username: data.subUserName,
      password: decrypt(data.subUserPwdEncrypt),
      title: 'Chinh sửa  tài khoản !',
    })
    // console.log(data)
    setEditFromShow(true);

  }

  const cancelEdit = () => {
    setEditFromShow(false)
  }

  useEffect(()=>{
    fetchSubAccount();
  }, []);

  useEffect(()=>{
    const result= subAccount.data.filter((item)=>{
      const item1 = item.desc.toLowerCase().match(search.toLocaleLowerCase());
      const item2 = item.url.toLowerCase().match(search.toLocaleLowerCase());
      return item1 || item2 ;
    });
    setFilter(result);
  },[search,subAccount.data]);

  const handleDelete=(val)=>{
    setDeleteID(val);
    setShowDeleteConfirm(true)

  }

  const confirmDelete=(val)=>{
    fetchDeleteSubAccount(deleteID);
    setShowDeleteConfirm(false);
  }

  const cancelDelete=(val)=>{
    setShowDeleteConfirm(false)
  }


  const validate = (values) => {
    const errors = {};
    return errors;
  };


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

  const addSubAcc = () => {
    dispatch(setShow(true));
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubAccountInfo({
      ...subAccountInfo,
      [name]: value,
    });
  };

  const addSubAccountHandle = () =>{

    if(subAccountInfo.add === true){
      fetchAddSubAccount(subAccountInfo)
    } else {
      fetchEditSubAccount(subAccountInfo)
    }
    setEditFromShow(false)
  }

  const style = {
    width: '70px',


  };

  return(
    <div className="container"> Tổng {subAccount.data.length}
      <div className="row container">
        <div className="col-md-8 row text-start">
          <div className="col-md-8 row text-start">

            {/*<button className="btn col-md-3 btn-danger p-2">Xóa </button>*/}

            <button className="btn col-md-6 btn-success p-2 mr-2" style={style} onClick={addSubAccountClick}>Thêm</button>
          </div>

        </div>
        <div className="col-md-4 text-end">

          <input type="text"
                 className="p-2  form-control"
                 placeholder="Tìm kiếm ..."
                 value={search}
                 onChange={(e) => SetSearch(e.target.value)}/>
        </div>
        {/*<div className="p-2">*/}
        {/*</div>*/}

      </div>
      <br/>
      <SweetAlert
        show={showDeleteConfirm}
        warning
        showCancel
        cancelBtnText="Để tôi xem xét "
        cancelBtnBsStyle="light"
        confirmBtnText="Chắc chắn rồi "
        confirmBtnBsStyle="danger"
        title="Bạn có chắc chắn muốn xóa?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        focusCancelBtn
      >
        Sau khi xóa sẽ không thể hoàn tác
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


      <SweetAlert
          show={addFormShow}
          warning
          showCancel
          cancelBtnText="Để tôi xem xét "
          cancelBtnBsStyle="light"
          confirmBtnText="Chắc chắn rồi "
          confirmBtnBsStyle="danger"
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          focusCancelBtn
      >
        Sau khi xóa sẽ không thể hoàn tác
      </SweetAlert>


      <SweetAlert
            show={editFormShow }
          showCancel
          cancelBtnText="Hủy"
          cancelBtnBsStyle="light"
          confirmBtnText="Lưu"
          title={subAccountInfo.title}
          onConfirm={addSubAccountHandle}
          onCancel={cancelEdit}
          focusCancelBtn
      >
          <form>
            <div className="row mb-3">
              {/*<div>Id : {subAccountInfo.id}</div>*/}
              <label htmlFor="url" className="col-auto col-md-3 col-form-label">Url: </label>
              <div className="col-md-9">
                <input type="text" name="url" placeholder="nhập url"   value={subAccountInfo.url}  onChange={handleInputChange} className="form-control"/>
              </div>
              {/*<ErrorMessage name="url" component="div" className="text-danger"/>*/}

              <label htmlFor="url" className="col-auto col-md-3 col-form-label">Mô tả: </label>
              <div className="col-md-9">
                <input type="text" name="desc" placeholder="Nhập mô tả " value={subAccountInfo.desc}   onChange={handleInputChange} className="form-control"/>
              </div>
              {/*<ErrorMessage name="desc" component="div" className="text-danger"/>*/}

              <label htmlFor="url" className="col-auto col-md-3 col-form-label">Tài khoản : </label>
              <div className="col-md-9">
                <input type="text" name="username" placeholder="nhập username" value={subAccountInfo.username}  onChange={handleInputChange} className="form-control"/>
              </div>
              {/*<ErrorMessage name="username" component="div" className="text-danger"/>*/}

              <label htmlFor="url" className="col-auto col-md-3 col-form-label">Mật khẩu:</label>
              <div className="col-md-9">
                <input type="text" name="password" placeholder="nhập password" value={subAccountInfo.password}   onChange={handleInputChange} className="form-control"/>
              </div>
            </div>

            <div/>
          </form>
      </SweetAlert>
    </div>


  );
}

export default ListSubAccView;
