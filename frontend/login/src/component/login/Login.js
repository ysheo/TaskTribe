import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import { Post } from "./fetch";

const User = {
  id: "test",
  pw: "test1234!@",
};

const Login = () => {

  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  //추후 ID 쿼리를 받아올 수 있도록 수정할 것
  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^[a-zA-Z0-9]*$/i;
    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  //추후 PW 쿼리를 받아올 수 있도록 수정할 것
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const onClickConfirmButton = () => {
    if (id === User.id && pw === User.pw) {
      alert("로그인에 성공했습니다.");
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  };

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
      <form className="login_Person" action="#" method="post">
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
