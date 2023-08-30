import { useNavigate } from 'react-router-dom'
import logo from '../image/logo.png'
import './style.css'

const Login = () => {
  let Navigate =useNavigate()
  let goHome=()=>{
   Navigate("/home")
  }
  return (
    <div className="box-form p-4 mt-5 body-bg">
        <div className="left col-md-6">
            <div className="overlay">
              <h1 className='text-center'>صباحك فل</h1>
              <p className='text-center text-black-50'>الانتاج السليم ف الاكل السليم</p>
              <span className='d-flex justify-content-center'>
                {/* <p>login with social media</p> */}
                {/* <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a> */}
                <a href="#"><img src={logo} alt="" /></a>
              </span>
            </div>
        </div>
        <form className="right col-md-6">
            <br />
            <br />
            <br />
            <h5 className='py-4 text-center'> <i>Tweet</i> </h5>
            {/* <div className="pt-5 text-center">
                <input type="text" placeholder="رقم الجوال"/>   
                <br/>
                <input type="password" placeholder="password"/>
            </div> */}
                {/* <br/><br/> */}
                {/* <div className="remember-me--forget-password ">
                  <label>
                    <input type="checkbox" name="item" checked/>
                    <span className="text-checkbox">Remember me</span>
                  </label>
                  <p>forget password?</p>
                </div> */}
              <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-success"onClick={goHome} >أطلب فطورك</button>  
              </div>
        </form>
    </div>
  )
}

export default Login
