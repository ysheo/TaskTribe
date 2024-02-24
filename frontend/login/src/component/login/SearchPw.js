import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const User = {
  id: "test",
  email: "test@gamil.com",
  check: "123456",
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

  const [showVerificationInput, setShowVerificationInput] = useState(false);

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

  //추후 이메일 쿼리를 받아올 수 있도록 수정할 것
  const handleEmail = (e) => {
    const einfo = e.target.value;
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,3})$/i;
    if (regex.test(einfo)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setemail(einfo);
    console.log(einfo)
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
    if (id === User.id && email === User.email && check === User.check) {
      alert("ID는 test 입니다.");
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  };

  useEffect(() => {
    if (idValid && emailValid && checkValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, emailValid, checkValid]);

  //timer
  
    // 초기 타이머 시간 (초)을 정의, 180초, 3분.
    const initialTime = 180;

    //남은 시간을 상태로 관리.
    const [remainingTime, setRemainingTime] = useState(initialTime);
  
    useEffect(() => {
      // useEffect을 사용하여 컴포넌트가 마운트될 때 타이머 시작.
      const timer = setInterval(() => {
        //남은 시간이 0보다 크면 1초씩 감소.
        if (remainingTime > 0) {
          setRemainingTime((prevTime)=> prevTime - 1);
        } else {
          // 남은 시간이 0이 되면 타이머 정지
          clearInterval(timer);
        }
      }, 1000);

      //컴포넌트가 언마운트되면 타이머 정지
      return ( ) => clearInterval(timer);
    }, [remainingTime]); //remainingTime이 변경될 떄마다 useEffect가 다시 실행됨.

      // 시간을 분과 초로 변화하는 함수

      const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };

      // 재전송 버튼을 클릭했을 때 호출되는 함수
      const handleResendClick = () => {
        setRemainingTime(initialTime); //남은 시간을 초기값으로 설정
      };

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
            onClick={() => navigate("/searchpw")}
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

          <div>
          {emailValid && email.length > 0 && (
            <button className="checkemail"
              onClick={() =>setShowVerificationInput(true)}>
              인증메일 발송</button>
            )}
          </div>
          </fieldset>

          {showVerificationInput && (
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

        <div>
        {checkValid && check.length > 0 && (
            <button className="check">인증하기</button>
            )}
          </div>
          <div className="errorMessage">
            {!checkValid && check.length > 0 && (
              <div>인증번호가 올바르지 않습니다.</div>
            )}
          </div>
          
          <div className="checkTime">
            <div>남은 시간 : <span>{formatTime(remainingTime)}</span></div>
          </div>

          <div>
            <button className="retimer" 
            onClick={handleResendClick}>
              재전송
            </button>
          </div>

          </fieldset>
          )}

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
