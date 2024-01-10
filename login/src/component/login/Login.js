import './login.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
//import {reactComponent as Icon} from "http://www.w3.org/2000/svg";
//import user_icon from 'http://www.w3.org/2000/svg'
//import MaterialIcon from 'react-google-material-icons'


const Login = () => {

    

        return(
        <div className="login">
             <div id = 'loginwrap'>
            <h3 className='logintext'>LogIn</h3>

            <div className='inputbox'>
            <FaUser className='icon' />
            <input type="text" placeholder='아이디' required />
            </div>

            <div className='inputbox'>
            <RiLockPasswordLine className='icon' />
                <input type="password" placeholder='비밀번호' required />
            </div>

            <div className='remember'>
                <label><input type='checkbox' />로그인 상태 유지</label>
            </div>

            <button type='submit'>로그인</button>
          
            </div>
            
        </div>


    )
}

export default Login;