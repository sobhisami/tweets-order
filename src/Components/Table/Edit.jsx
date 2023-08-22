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
    updateItem(id, DataUpdate);
    console.log(DataUpdate, id);
    
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
        <div className="mb-3 col-md-6">
          <Label>المطعم</Label>
          <Input type={'text'} onChange={e=>setDate(e.target.value)} value={date} className="form-control addDate" placeholder="زهران او الطيبات"/>
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
