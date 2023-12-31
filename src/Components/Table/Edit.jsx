import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Forms from '../Form/Forms';
import Label from '../Form/Label';
import Input from '../Form/Input';
import axios from 'axios';
import Swal from 'sweetalert2';

const Edit = ({updateItem,data}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [title,setTitle]=useState(data.title);
  let [date,setDate]=useState(data.date);
  let [value,setValue]=useState(data.value);
  let [totalPrice,setTotalPrice]=useState(data.totalPrice);
  let [description,setDescription]=useState(data.description);
  const id = data.id
  let DataUpdate={id,title,date,value,description,totalPrice}
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(DataUpdate, id);
    if (checkData()) {
    updateItem(id, DataUpdate);
    }
    axios.put(`https://expenses-app-32e19-default-rtdb.firebaseio.com/CRUD/${id}.json`, DataUpdate)
      .then(res => {
        console.log("Success Edit");
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  useEffect(()=>{
    handleClose()
  },[data])
  let checkData = () => {
    if (title === "" || date === "" || value === "" || description === "" || totalPrice === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ادخل كافة التفاصيل مثل السعر والاسم',
      });
      return false;
    }
  
    if (description.length > 20) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'وصف الطلب يجب أن يكون أقل من 30 حرفًا',
      });
      return false;
    }
  
    if (Number(value) > Number(totalPrice)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'يجب ان تكون قيمة طلبك اقل من او تساوي المبلغ المدفوع',
      });
      return false;
    }
  
    return true;
  }
  return (
    <>
      <Button variant="" className="d-flex justify-content-between align-items-center" onClick={handleShow}>
      <FontAwesomeIcon icon={faEdit} style={{marginRight:"-6px"}} />
      </Button>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row" onSubmit={handleSubmit}>
        <div className="mb-3 col-md-6">
        <Label>اسم المبرمج</Label>
        <Input type={"text"} onChange={e=>setTitle(e.target.value)} value={title} className="form-control addTitle" placeholder="مثلاً علاء"/>
        </div>
        <div className=" col-md-6 mt-4 pt-2">
        <select onChange={e=>setDate(e.target.value)} value={date} className="form-select form-select" aria-label=".form-select-lg example">
          <option  defaultValue="اختار المطعم" >اختار المطعم</option>
          <option value="زهران">زهران</option>
          <option value="الطيبات">الطيبات</option>
          <option value="شبيك لبيك">شبيك لبيك</option>
          <option value="الملكي"> الملكي</option>
        </select>
      </div>
        <div className="mb-3 col-md-12">
          <Label>طلبك</Label>
          <textarea type={'text'} onChange={e=>setDescription(e.target.value)} value={description} className="form-control addDescrption" placeholder="ساندويتش فلافل مع فول ساندويتش فلافل مع حمص"/>
        </div>
        <div className="mb-3 col-md-6">
          <Label>  المبلغ المدفوع بالشيكل</Label>
          <Input type={'number'} onChange={e=>setTotalPrice(e.target.value)} value={totalPrice} className="form-control addValue py-2" />
        </div>
        <div className="mb-3 col-md-6">
          <Label>قيمة طلبك بالشيكل</Label>
          <Input type={'number'} onChange={e=>setValue(e.target.value)} value={value} className="form-control addValue py-2" />
        </div>
          <div className="mb-3 col-md-12 text-right p-3">
            <button type="submit" className="btn btn-primary addBtn px-5" >تحديث الطلب</button>
          </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Edit
