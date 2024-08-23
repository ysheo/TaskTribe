import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { Post } from "./fetch";

// const User = {
//   id: "test1",
//   pw: "123123",
// };

const Login = () => {

  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  //추후 ID 쿼리를 받아올 수 있도록 수정할 것
  const handleId = (e) => {
    const value =e.target.value;
    setId(value);
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(value)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  //추후 PW 쿼리를 받아올 수 있도록 수정할 것
  const handlePw = (e) => {
    const value =e.target.value;
    setPw(value);
    const regex =
    ///^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    /^(?=.*[a-zA-z0-9]).{5,20}$/;
    if (regex.test(value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const onClickConfirmButton = async (e) => {
    e.preventDefault();
    const body = {
      userid: id,
      password: pw
    };

   
      const validCheck = await Post("/api/auth/login", body);
      console.log(id);
      console.log(idValid);
      console.log(pwValid);
      console.log(validCheck);

    if (id === idValid && pw === pwValid) {
      alert("로그인에 성공했습니다.");
      navigate("/dashboard"); // 로그인 성공 시 이동할 페이지
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  }
  

  useEffect(() => {
    if (idValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwValid]);

  return (
    <div className="loginbound">
      <h3>로그인</h3>
      <form className="login_Person" action="#" method="Post">
        <fieldset>
          <div className="idinputbox">
            <FaUser className="icon" />
            <input
              className="input"
              type="text"
              placeholder="아이디"
              value={id}
              onChange={handleId}
              required
            />
          </div>
          <div className="errorMessage">
            {!idValid && id.length > 0 && (
              <div>올바른 아이디를 입력해주세요.</div>
            )}
          </div>

          <div className="pwinputbox">
            <RiLockPasswordLine className="icon" />
            <input
              className="input"
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={handlePw}
              required
            />
          </div>
          <div className="errorMessage">
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
          </div>
          <div className="remember">
            <label>
              <input type="checkbox" />
              로그인 상태 유지
            </label>
          </div>
        </fieldset>
        <div>
          <button
            onClick={onClickConfirmButton}
            disabled={notAllow}
            className="loginbnt"
          >
            로그인
          </button>

{/*           <button
            onClick={onClickConfirmButton}
            className="test"
          >
            임시버튼
          </button> */}
        </div>

        <fieldset>
          <div className="searchbox">
            <p onClick={() => navigate("/search")}> 아이디 찾기 </p>
            <span>|</span>
            <p onClick={() => navigate("/searchPw")}> 비밀번호 찾기 </p>
            <span>|</span>
            <p onClick={() => navigate("/join")}> 회원가입 </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
