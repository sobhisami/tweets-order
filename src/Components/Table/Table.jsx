import Trow from "./Trow"
import style from "./style.module.css"

const Table = ({dataSet,DeleteItem,updateItem,tableId}) => {

  return (
    <table id={tableId}  className={`table table-responsive ${style.tableSmall}`} >
    <thead>
      <tr className="text-center">
        <th> الاسم</th>
        <th> المطعم</th>
        <th>وصف طلبك</th>
        <th>المبلغ المدفوع</th>
        <th>سعر الطلب</th>
        <th>المتبقي</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {dataSet.map(e=> <Trow key={e.id} data={e} DeleteItem={DeleteItem} updateItem={updateItem}/> )}
    </tbody>
    </table>
  )
}

export default Table
