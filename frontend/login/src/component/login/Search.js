import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const User = {
  name: "홍길동",
  email: "test@gamil.com",
};

const Search = () => {

  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  //추후 ID 쿼리를 받아올 수 있도록 수정할 것
  const handleName = (e) => {
    setname(e.target.value);
    const regex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/i;
    if (regex.test(name)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  //추후 PW 쿼리를 받아올 수 있도록 수정할 것
  const handleEmail = (e) => {
    setemail(e.target.value);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,3})$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const onClickConfirmButton = () => {
    if (name === User.name && email === User.email) {
      alert("ID는 test 입니다.");
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  };

  useEffect(() => {
    if (nameValid && emailValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, emailValid]);

  return (
    <div className="search">
      <h3>아이디 찾기</h3>
      <form>
        <fieldset>
          <div className="searchbounder">
            <button 
            onClick={() => navigate("/search")}
            className="searchid">아이디 찾기</button>
            <button 
            onClick={() => navigate("/searchPw")}
            className="searchpw">비밀번호 찾기</button>
          </div>
        </fieldset>

        <fieldset>
          <div className="nametext">가입한 이름을 입력하세요.</div>
          <div className="nameinputbox">
            <FaUser className="icon" />
            <input
              className="input"
              type="text"
              placeholder="이름"
              value={name}
              onChange={handleName}
              required
            />
          </div>
          <div className="errorMessage">
            {!nameValid && name.length > 0 && (
              <div>존재하지 않는 이름입니다.</div>
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
        </fieldset>

        <fieldset>
        <div>
          <button
            onClick={onClickConfirmButton}
            disabled={notAllow}
            className="idsearchbnt">
            아이디 찾기
          </button>
        </div>
        </fieldset>

      </form>
    </div>
  );
};

export default Search;
