
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Swal from "sweetalert2";
import Edit from "./Edit";
import axios from "axios";
const Trow = ({data,DeleteItem,updateItem}) => {
  let onDelete=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://expenses-app-32e19-default-rtdb.firebaseio.com/CRUD/${data.id}.json`)
        .then(res=>{
          DeleteItem(data.id);
        }).catch(err=>{
          console.log(err);
        })
        Swal.fire(
          'Deleted!',
          'تم حذف طلبك',
          'success'
        )
      }
    })
  }

  return (
    <tr className="text-center">
      <td> {data.title.label} </td>
      <td>{data.selectedMenu}</td>
      <td>
          {data.selectedOptions.map((option, index) => (
              <span key={index}>{option.quantity} {option.product} 
              {index < data.selectedOptions.length - 1 && <br />}
              </span>
            ))} 
      </td>
      <td>{data.totalPrice}ش</td>
      <td>{data.price} ش</td>
      <td>{data.totalPrice-data.price} شيكل</td>
      {/* <td  className="text-right d-flex" style={{cursor: "pointer"}}><a   onClick={onDelete} href="#" className="delete pt-1" >
        <FontAwesomeIcon icon={faTrashAlt}/>
        </a>
        <a href="#" className="delete mx-2" >
          <Edit updateItem={updateItem} data={data}/>
        </a>
        </td> */}
    </tr>
  )
}

export default Trow
