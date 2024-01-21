// import { useState } from "react";
import "../css/login.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
// import {useForm} from "react-hook-form";


const Login = () => {

// const [id, setId] = useState(' ');
// const [pw, setPw] = useState("");

// const [idValid, setIdValid] = useState(false);
// const [pwValid, setPwValid] = useState(false);

// const handleId =(e) => {
//   setId(e.target.value);
// }

// const handlePw =(e) => {
//   setPw(e.target.value);
// }

  return (
    <div className="loginwrap">
      <form action=''>
        <h3 className="logintext">로그인</h3>

        <div className="inputbox">
          <FaUser className="icon" />
          <input type="text" 
            placeholder="아이디"
            // value={id}
            // onChange={handleId}
            required/>
        </div>

        <div className="inputbox">
          <RiLockPasswordLine className="icon" />
          <input type="password" 
          placeholder="비밀번호" 
          // value={pw}
          // onChange={handlePw}
          required/>
        </div>

        <div className="remember">
          <label>
            <input type="checkbox" />
            로그인 상태 유지
          </label>
        </div>

        <div className='warn'>
          <span>존재하지 않는 계정입니다.</span>
        </div>

        <button type="submit" >로그인</button>

        <div className="searchbox">
          <Link to={"https://www.naver.com"}> 아이디 찾기 </Link>
          <span>|</span>
          <Link to={"https://www.daum.net"}> 비밀번호 찾기 </Link>
          <span>|</span>
          <Link to={"https://www.google.com"}> 회원가입 </Link>
        </div>
      </form>
    </div>
  )
  }

export default Login;
