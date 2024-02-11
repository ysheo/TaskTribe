import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const User = {
  id: "test",
  email: "test@gamil.com",
};

const Search = () => {

  const navigate = useNavigate();
  const [id, setid] = useState("");
  const [email, setemail] = useState("");
  const [check, setcheck] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [checkValid, setCheckValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  //추후 ID 쿼리를 받아올 수 있도록 수정할 것
  const handleId = (e) => {
    setid(e.target.value);
    const regex =  /^[a-zA-Z0-9]*$/i;
    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  //추후 PW 쿼리를 받아올 수 있도록 수정할 것
  const handleEmail = (e) => {
    setemail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,3})$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlecheck = (e) => {
    setcheck(e.target.value);
    const regex =  /^[0-9]{5}$/i;
    if (regex.test(check)) {
      setCheckValid(true);
    } else {
      setCheckValid(false);
    }
  };

  const onClickConfirmButton = () => {
    if (id === User.id && email === User.email) {
      alert("ID는 test 입니다.");
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  };

  useEffect(() => {
    if (idValid && emailValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, emailValid]);

  return (
    <div className="search">
      <h3>비밀번호 찾기</h3>
      <form>
        <fieldset>
          <div className="searchPwbounder">
            <button 
            onClick={() => navigate("/search")}
            className="searchPwid">아이디 찾기</button>
            <button 
            onClick={() => navigate("/")}
            className="searchPwpw">비밀번호 찾기</button>
          </div>
        </fieldset>

        <fieldset>
          <div className="nametext">가입한 아이디를 입력하세요.</div>
          <div className="nameinputbox">
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
              <div>존재하지 않는 아이디입니다.</div>
            )}
          </div>

          <div className="emailtext">가입한 이메일을 입력하세요.</div>
          <div className="emailinputbox">
            <MdOutlineEmail className="icon" />
            <input
              className="input"
              type="text"
              placeholder="이메일"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div className="errorMessage">
            {!emailValid && email.length > 0 && (
              <div>이메일이 올바르지 않습니다.</div>
            )}
          </div>

          <div className="checkemail">
            <button>인증메일 발송</button>
          </div>
          </fieldset>

          <fieldset>
          <div className="checkinputbox">
            <input
              className="input"
              type="text"
              placeholder="인증번호"
              value={check}
              onChange={handlecheck}
              required/>
        </div>
        <div className="check">
            <button>인증하기</button>
          </div>
          <div className="errorMessage">
            {!checkValid && check.length > 0 && (
              <div>인증번호가 올바르지 않습니다.</div>
            )}
          </div>
          </fieldset>
        

        <fieldset>
        <div>
          <button
            onClick={onClickConfirmButton}
            disabled={notAllow}
            className="pwsearchbnt">
            비밀번호 찾기
          </button>
        </div>
        </fieldset>
        
      </form>
    </div>
  );
};

export default Search;
