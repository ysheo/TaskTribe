import './login.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
//import {Link} from 'react-router-dom';
//import {reactComponent as Icon} from "http://www.w3.org/2000/svg";
//import user_icon from 'http://www.w3.org/2000/svg'
//import MaterialIcon from 'react-google-material-icons'


const Login = () => {

    

        return(
            <body>
        <div className="loginwrap">
            <form action=''>
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

            <div className='searchbox'>
                <Link to={'https://www.naver.com'}> 아이디 찾기 </Link>
                <Link>|</Link>
                <Link to={'https://www.daum.net'}> 비밀번호 찾기 </Link>
                <Link>|</Link>
                <Link to={'https://www.google.com'}> 회원가입 </Link>
            </div>
            
            
            </form>
            </div>
            
       
        </body>

    )
}

export default Login;