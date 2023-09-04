import { Forms, Input, Label, Table } from './Components';
import { useEffect, useState } from 'react';
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap/dist/js/bootstrap.js';
  import logo from './image/almalky.jpg'
  import logo2 from './image/shobak.jpg'
  import logo3 from './image/tibat.jpg'
  import logo4 from "./image/zahran.jpg"
  import axios from 'axios';
  import Slider from 'react-slick'; 
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css"; 
  const App = ({tableId}) => {
    let [dataSet,setDateSet]=useState([]);
    let [search,setSearch]=useState("");
    const [selectedMenu, setSelectedMenu] = useState('');
    
      let saveItem=(data)=>{
        setDateSet([data,...dataSet])
      }
      let DeleteItem=(item)=>{
        let filtered= dataSet.filter(e=> e.id!=item)
        setDateSet(filtered)
      }
      let updateItem=(id,DataUpdate)=>{
        let update=dataSet.map(e=>e.id===id ? DataUpdate : e)
        setDateSet(update);
      }
  
      let fetchData=()=>{
        axios.get("https://expenses-app-32e19-default-rtdb.firebaseio.com/CRUD.json")
        .then(res=>{
        console.log(res.data);
        let Data=[];
        for(let key in res.data){
          let value = res.data[key];
          value.id=key;
          Data.push(value);
        }
        setDateSet(Data)
        }).catch(err=>{
          console.log(err);
        })
      }
      useEffect(()=>{
        fetchData();
      },[])
      // let searchHandler=()=>{
        // if (search) {
        //   let searched= dataSet.filter(e=>e.title.toLowerCase().includes(search.toLowerCase()))
        //     return searched
        //     console.log(searched);
        // }else{
        //   return dataSet
        // }
      // }
      //   return search ? dataSet.filter(e=>e.title.toLowerCase().includes(search.toLowerCase())):  dataSet
        let searchHandler=  search ? dataSet.filter(e=>e.selectedMenu.toLowerCase().includes(search.toLowerCase()) ||e.title.label.toLowerCase().includes(search.toLowerCase()) ):  dataSet
        const printTable = () => {
          const printFrame = window.frames["print_frame"];
          const tableElement = document.getElementById("printableTable");
        
          const clonedTable = tableElement.cloneNode(true);
          const lastColumnIndex = 2; // Index of the third column (0-based)
        
          for (let row of clonedTable.rows) {
            for (let columnIndex = row.cells.length - 1; columnIndex > lastColumnIndex; columnIndex--) {
              row.deleteCell(columnIndex);
            }
          }
        
          clonedTable.style.borderCollapse = 'collapse';
          clonedTable.dir = 'rtl';
          clonedTable.style.margin = '0 auto'; // Center the table horizontally
        
          const cells = clonedTable.getElementsByTagName('td');
          for (let cell of cells) {
            cell.style.border = '1px solid black';
            cell.style.padding = '10px'; 
            cell.style.fontSize = '16px'; 
            cell.style.fontWeight = 'bold';
          }
        
          clonedTable.style.width = '80%'; 
          clonedTable.style.marginTop = '20px'; 
        
          const tableContent = clonedTable.outerHTML;
        
          printFrame.document.body.innerHTML = `<table>${tableContent}</table>`;
          printFrame.window.focus();
          printFrame.window.print();
        };
        
      
        const settings = {
          dots: true, 
          fade: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        };
    return (
      <div className="container mt-5">
        <div className="row">
        {/* <div className="col-sm-6 pt-4">
          <img src={logo}className="img-fluid rounded-5" alt=""/>
        </div> */}
        <div className='col-sm-6 pt-4'>
              <h2 className='text-center'>المنيو</h2>
              <Slider {...settings}>
              {selectedMenu === '' && (
                    <div>
                      <img src={logo4} style={{ height: "450px", width: "100%", objectFit: "contain" }} className='img-fluid rounded-5' />
                    </div>
                  )}
              {selectedMenu === 'زهران' && (
                    <div>
                      <img src={logo4} style={{ height: "450px", width: "100%", objectFit: "contain" }} className='img-fluid rounded-5' />
                    </div>
                  )}
                  {selectedMenu === 'الملكي' && (
                    <div>
                      <img src={logo} style={{ height: "450px", width: "100%", objectFit: "contain" }} className='img-fluid rounded-5' />
                    </div>
                  )}
                  {selectedMenu === 'الطيبات' && (
                    <div>
                      <img src={logo3} className='img-fluid rounded-5' style={{ height: "450px", width: "100%", objectFit: "contain" }} />
                    </div>
                  )}
                  {selectedMenu === 'شبيك لبيك' && (
                    <div>
                      <img src={logo2} className='img-fluid rounded-5' style={{ height: "450px", width: "100%", objectFit: "contain" }} />
                    </div>
                  )}
  </Slider>
          </div>
        <div className="col-sm-6 mt-5" dir="rtl">
          <div className="row">
            <h4 className=""> أطلب فطورك  </h4>
            <p>
              اطلب فطورك من مطعم زهران او الطيبات او شبيك لبيك او الملكي
            </p>
          </div>
          <Forms saveItem={saveItem} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
        </div>
        </div>
        
        <div className="row mt-2 mb-5">
        <div className="custom-card" dir='rtl'>
          <div className='d-flex justify-content-between'>
          <div className="col-md-3 mb-4 text-center">
            <Label style={{fontWeight: "bold"}}>بحث باسم المطعم او الاسم</Label>
            <Input type={"text"} onChange={e=>setSearch(e.target.value)} value={search} className="form-control addSearch"  placeholder="زهران"/>
          </div>
          <div className='pt-4 mt-2'>
            <button onClick={printTable} className='rounded btn btn-light rounded bg-body-secondary'>طباعة الطلبية</button>
          </div>
          </div>
          <iframe name="print_frame" id="print_frame" style={{display:"none"}}></iframe>
        <Table  dataSet={searchHandler} DeleteItem={DeleteItem} updateItem={updateItem} tableId="printableTable" print_frame="print_frame"/>
        </div>
        </div>
      </div>
    )
  }

  export default App
