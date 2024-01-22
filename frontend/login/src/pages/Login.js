import { useState } from "react";
import "../css/login.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const dummy = [
    {
        id: 'test1',
        pass: 'testpass1'
    },
    {
        id: 'test2',
        pass: 'testpass2'
    }
]



const Login = () => {

    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [data, setData] = useState(dummy);
  

    const [isTrue, setIsTrue]= useState(false);

    const handleId = (e) => {
        setId(e.target.value);
    }
    const handlePass = (e) => {
        setPass(e.target.value);
    }
    
    console.log(pass);

    const trueData = () => {
      if (id === data.id && pass === data.pass) {
        alert('로그인이 성공하였습니다.');
        // 로그인 성공 시 데이터 업데이트
        setData(dummy); // 또는 실제 서버에서 받은 데이터로 업데이트
      } else {
        setIsTrue(true);
      }
    };

    // const trueData = () => {
    //     if(id === data.id){
    //         if(pass === data.pass){
    //             alert('로그인이 성공하였습니다.')
    //         }
    //     } else {
    //         setIsTrue(true);
    //     }
    // }
    console.log(data[1].id)

  return (
    <div className="loginwrap">
      <form >
        <h3 className="logintext">로그인</h3>

        <div className="inputbox">
          <FaUser className="icon" />
          <input type="text" placeholder="아이디" required value={id} onChange={handleId}/>
        </div>

        <div className="inputbox">
          <RiLockPasswordLine className="icon" />
          <input type="password" placeholder="비밀번호" required value={pass} onChange={handlePass}/>
        </div>

        <div className="remember">
          <label>
            <input type="checkbox" />
            로그인 상태 유지
          </label>
        </div>

        <div className={isTrue? `warn true` : 'warn'}>
          <span>존재하지 않는 계정입니다.</span>
        </div>

        <button type="submit" onClick={()=>(trueData)} >로그인</button>

        <div className="searchbox">
          <p onClick={()=>(navigate('/search'))}> 아이디 찾기 </p>
          <span>|</span>
          <p> 비밀번호 찾기 </p>
          <span>|</span>
          <p onClick={()=>(navigate('/join'))}> 회원가입 </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
