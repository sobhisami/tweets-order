import { useState } from "react"
import Input from "./Input"
import Label from "./Label"
import Swal from "sweetalert2";
import axios from "axios";
import {MultiSelect,calculateTotalPrice} from "./MultiSelect";
import { Almalky, shopak, altibat, zahran,drink,sweets} from '../../Data/Data'
import { Names } from "./Names";

const Forms = ({saveItem,selectedMenu,setSelectedMenu}) => {
    let   [title,setTitle]=useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    let   [totalPrice,setTotalPrice]=useState("");
    const [totalProductsPrice, setTotalProductsPrice] = useState(0);
    const handleMenuChange = event => {
      setSelectedMenu(event.target.value);
      setSelectedOptions([]); 
    };
    const handleMultiSelectChange = selectedValues => {
        setSelectedOptions(selectedValues);
    };
    let submitHandler=(e)=>{
        e.preventDefault()
        console.log(Data);
        console.log(selectedOptions);
        // console.log("Data:", JSON.stringify({ id, title, selectedMenu, totalPrice, price,selectedOptions}, null, 2));
        if (checkData()) {
           Data.selectedOptions.map((elem)=>{
              delete elem.label;
          });
          axios.post("https://expenses-app-32e19-default-rtdb.firebaseio.com/CRUD.json",Data)
          .then(res=>{
            Data.id=res.data.name;
            console.log(res);
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
      setSelectedMenu("")
      // setValue("")
      setSelectedOptions("")
      setTotalPrice("")
    }
    // let checkData=()=>{
    //   if (title!="" && date!="" && value!="" && description!="" && totalPrice!="") {
    //     return true;
    //     }else{
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'ادخل كافة التفاصيل مثل السعر والاسم',
    //       })
    //     }
    //     if (description.length > 30) {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'وصف الطلب يجب أن يكون أقل من 30 حرفًا',
    //       });
    //       return false;
    //     }
    //     if (value>totalPrice) {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'يجب ان تكون قيمة طلبك اقل من او تساوي المبلغ المضاف',
    //       });
    //       return false;
    //     }
    //   }
    let checkData = () => {
      if (title === "" || selectedMenu === "" ||  selectedOptions.length === 0 || totalPrice === "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ادخل كافة التفاصيل مثل السعر والاسم',
        });
        return false;
      }
    
      // // if (description.length > 50) {
      // //   Swal.fire({
      // //     icon: 'error',
      // //     title: 'Oops...',
      // //     text: 'وصف الطلب يجب أن يكون أقل من 30 حرفًا',
      // //   });
      // //   return false;
      // // }
    
      if (calculateTotalPrice(selectedOptions) > Number(totalPrice)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'يجب ان تكون قيمة طلبك اقل من او تساوي المبلغ المدفوع',
        });
        return false;
      }
    
      return true;
    }
    let onChangeHandle=(selectedName)=>{
      setTitle(selectedName);
    }
    let id =  Math.floor(Math.random() * 200) + 1;
    let price=calculateTotalPrice(selectedOptions);
    let Data={id,title,selectedMenu,selectedOptions,totalPrice,price}
    return (
      <form className="row" onSubmit={submitHandler}>
      <div className="mb-3 col-md-6">
        <Label>اختار/ي الاسم </Label>
        {/* <Input type={"text"} onChange={e=>setTitle(e.target.value)} value={title} className="form-control addTitle" placeholder="مثلاً علاء مبارك"/> */}
        <Names onChange={onChangeHandle} values={title}/>
      </div>
      <div className=" col-md-6 mt-4 pt-2">
        <select  onChange={handleMenuChange}
        value={selectedMenu} className="form-select form-select" aria-label=".form-select-lg example">
          <option  defaultValue="اختار المطعم" >اختار المطعم</option>
          <option value="زهران">زهران</option>
          <option value="الطيبات">الطيبات</option>
          <option value="شبيك لبيك">شبيك لبيك</option>
          <option value="الملكي"> الملكي</option>
          <option value="مشروبات">  مشروبات و بسكوت</option>
          <option value="كنافة"> كنافة ساق الله</option>
        </select>
      </div> 
      <div className="mb-3 col-md-12">
        {/* <Label>طلبك</Label>
        <textarea type={'text'} onChange={e=>setDescription(e.target.value)} value={description} className="form-control addDescrption" placeholder="ساندويتش فلافل مع فول
ساندويتش فلافل مع حمص"/> */}
            {selectedMenu === 'الطيبات' && <MultiSelect menuOptions={altibat} onChange={handleMultiSelectChange} value={selectedOptions} />}
            {selectedMenu === 'زهران' && <MultiSelect menuOptions={zahran} onChange={handleMultiSelectChange} value={selectedOptions} />}
            {selectedMenu === 'الملكي' && <MultiSelect  menuOptions={Almalky} onChange={handleMultiSelectChange} value={selectedOptions} />}
            {selectedMenu === 'شبيك لبيك' && <MultiSelect menuOptions={shopak} onChange={handleMultiSelectChange} value={selectedOptions}  />}
            {selectedMenu === 'مشروبات' && <MultiSelect menuOptions={drink} onChange={handleMultiSelectChange} value={selectedOptions}  />}
            {selectedMenu === 'كنافة' && <MultiSelect menuOptions={sweets} onChange={handleMultiSelectChange} value={selectedOptions}  />}
      </div>
      <div className="mb-3 col-md-6">
        <Label> المبلغ المدفوع </Label>
        <Input type={'number'} onChange={e=>setTotalPrice(e.target.value)} value={totalPrice} className="form-control addValue py-2" placeholder="مثلاً 20 "/>
      </div>
      <div className="mb-3 col-md-6">
        <Label>قيمة طلبك بالشيكل</Label>
        <Input type={'text'}  value={calculateTotalPrice(selectedOptions)} className="form-control addValue py-2" disabled />
      </div>
      <div className="mb-3 col-md-12 text-right p-3">
        <button type="submit" className="btn btn-primary addBtn px-5" >طلب</button>
      </div>
      </form>
    )
}

export default Forms
