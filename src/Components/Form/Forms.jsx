import { useState } from "react"
import Input from "./Input"
import Label from "./Label"
import Swal from "sweetalert2";
import axios from "axios";

const Forms = ({saveItem}) => {
    let [title,setTitle]=useState("");
    let [date,setDate]=useState("");
    let [description,setDescription]=useState("");
    let [totalPrice,setTotalPrice]=useState("");
    let [value,setValue]=useState("");
    
    let submitHandler=(e)=>{
      e.preventDefault()
      console.log(Data);
        if (checkData()) {
          axios.post("https://expenses-app-32e19-default-rtdb.firebaseio.com/CRUD.json",Data)
          .then(res=>{
            Data.id=res.data.name;
            console.log("success adding");
            EmptyData()
          }).catch(err=>{
            console.log(err);
          })
          saveItem(Data);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'تم طلب فطورك جهز فلوسك'
          })
        }
     
    }
    let EmptyData=()=>{
      setTitle("")
      setDate("")
      setValue("")
      setDescription("")
      setTotalPrice("")
    }
    let checkData=()=>{
      if (title!="" && date!="" && value!="" && description!="" && totalPrice!="" && value<totalPrice) {
        return true;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'ادخل كافة التفاصيل مثل السعر والاسم',
          })
        }
      }

    let id =  Math.floor(Math.random() * 200) + 1;
    let Data={id,title,date,value,description,totalPrice}
    return (
      <form className="row" onSubmit={submitHandler}>
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
        <textarea type={'text'} onChange={e=>setDescription(e.target.value)} value={description} className="form-control addDescrption" placeholder="ساندويتش فلافل مع فول
ساندويتش فلافل مع حمص"/>
      </div>
      <div className="mb-3 col-md-6">
        <Label>  المبلغ المدفوع بالشيكل</Label>
        <Input type={'number'} onChange={e=>setTotalPrice(e.target.value)} value={totalPrice} className="form-control addValue py-2" placeholder="مثلاً 20 "/>
      </div>
      <div className="mb-3 col-md-6">
        <Label>قيمة طلبك بالشيكل</Label>
        <Input type={'number'} onChange={e=>setValue(e.target.value)} value={value} className="form-control addValue py-2" />
      </div>
      <div className="mb-3 col-md-12 text-right p-3">
        <button type="submit" className="btn btn-primary addBtn px-5" >طلب</button>
      </div>
      </form>
    )
}

export default Forms
