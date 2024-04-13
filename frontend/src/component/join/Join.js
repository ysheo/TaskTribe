import { useState } from 'react';
import '../../css/join.css'

const Join = () => {
    //change event state
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [email, setEmail] = useState("");
    //유효성 검사 state
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    //test
    const [valid, setValid] = useState({id:false, pw:false, email:false});

    //비밀번호 암호화 해제 state 
    const [visiblePW1, setvisiblePW1] = useState(false);
    const [visiblePW2, setvisiblePW2] = useState(false);

    // //유효성 확인 공통 함수
    const handleValid = (e,type, value, regex) => {
        const newPassword = e.target.value;
        setPw(newPassword);

        const isValid = regex.test(value);
        const newValue = valid;
        newValue[type] = isValid;
        setValid(newValue);
    };

    // id 정규화식 및 유효성 확인
    const handleID = (e) => {
        setId(e.target.value);
        const regex = /^[a-zA-Z0-9]{6,20}$/i;
        if (regex.test(id)) {
            setIdValid(true);
        } else {
            setIdValid(false);
        }
    };

    // pw 정규화식 및 유효성 확인
    const handlePW = (e) => {
        const newPassword = e.target.value;
        setPw(newPassword);
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;
        const isValid = regex.test(newPassword);
        setPwValid(isValid);
    };

    // email 정규화식 및 유효성 확인
    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        const isValid = regex.test(newEmail);
        setEmailValid(isValid);
    };

    // pw 암호화 토글
    const handleVisiblePW1 = () => setvisiblePW1(!visiblePW1);
    const handleVisiblePW2 = () => setvisiblePW2(!visiblePW2);

    return(
        <div className="join">
            <h1 className='logo'>Task Tribe</h1>
            <h3>Sign Up</h3>
            <form className='personal_info' action="#" method="post">
                <fieldset>
                    <div className='id_box'>
                        <h5>아이디</h5>
                        <div>
                            <div>
                                <input type='text' name="idInput" id="idInput" value={id} onChange={handleID} title="아이디 입력" required />
                                <span className="material-symbols-outlined" style={idValid === true ? {color:'#32AC72'} : {}}>check_circle</span>
                            </div>
                            <div className='warn_box'>
                                <p className='success' style={idValid === true ? {display:'block'} : {}}>사용 가능한 아이디입니다.</p>
                                {!idValid && id.length > 0 && (
                                    <>
                                        <p>올바른 아이디를 입력해주세요.</p>
                                        <p>6글자 이상, 최대 20글자 이내 / 특수문자, 한글 사용 불가</p>
                                    </>
                                )}
                                <button className=''>중복확인</button>
                            </div>
                        </div>
                    </div>
                    <div className='pw1_box'>
                        <h5>비밀번호</h5>
                        <div>
                            <div>
                                <input type={visiblePW1?'text':'password'} name="pwInput" id="pwInput" value={pw} onChange={handlePW} title="비밀번호 입력" required/>
                                <span className="material-symbols-outlined" onClick={handleVisiblePW1}>{visiblePW1?'visibility':'visibility_off'}</span>
                            </div>
                            <div className='warn_box'>
                                <p className='success' style={pwValid === true ? {display:'block'} : {}}>사용 가능한 비밀번호입니다.</p>
                                {!pwValid && pw.length > 0 && (
                                    <>
                                        <p>올바른 비밀번호를 입력해주세요.</p>
                                        <p>8글자 이상, 영문 대/소문자, 숫자, 특수문자 1글자 이상 사용해주세요.</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='pw2_box'>
                        <h5>비밀번호 확인</h5>
                        <div>
                            <div>
                                <input type={visiblePW2?'text':'password'} name="pwCheckInput" id="pwCheeckInput" value={pwCheck} onChange={(e)=>setPwCheck(e.target.value)} title="비밀번호 확인" required/>
                                <span className="material-symbols-outlined">check_circle</span>
                                <span className="material-symbols-outlined" onClick={handleVisiblePW2}>{visiblePW2?'visibility':'visibility_off'}</span>
                            </div>
                            <div className='warn_box'>
                                <p className='success'>비밀번호가 일치합니다.</p>
                                <p className='fail'>비밀번호가 일치하지 않습니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className='email_box'>
                        <h5>이메일</h5>
                        <div>
                            <div>
                                <input type='text' name="emailInput" id="emailInput" value={email} onChange={handleEmail} title="이메일 입력" required/>
                            </div>
                            <div className='warn_box'>
                                <p className='success' style={emailValid === true ?{display:'block'} : {}}>사용 가능한 비밀번호입니다.</p>
                                {!emailValid && email.length > 0 && (
                                    <>
                                        <p>이메일 주소 형식으로 입력해주세요.</p>
                                    </>
                                )}
                                <button className='check'>이메일 인증하기</button>
                            </div>
                        </div>
                    </div>
                    <div className='name_box'>
                        <h5>이름</h5>
                        <div>
                            <input type='text'></input>
                        </div>
                    </div>
                    <div className='RRN_box'>
                        <h5>주민등록번호</h5>
                        <div>
                            <input type='number' className='RRN1' maxLength={6} minLength={6}></input>
                            <span>-</span>
                            <input type='number' className='RRN2'></input>
                            <span>* * * * * *</span>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="all_agree">
                        <div>
                            <span className="material-symbols-outlined">check_circle</span>
                            <p>전체 동의하기</p>
                        </div>
                        <p className="agree">이용약관(필수), 개인정보 수집 및 이용(필수)의 동의를 포함합니다.</p>
                    </div>
                    <div className="use_agree">
                        <div>
                            <span className="material-symbols-outlined">check_circle</span>
                            <p>이용약관<span>(필수)</span></p>
                        </div>
                        <p className="agree_scroll">Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe </p>
                    </div>
                    <div className="info_agree">
                        <div>
                            <span className="material-symbols-outlined">check_circle</span>
                            <p>개인정보 수집 및 이용<span>(필수)</span></p>
                        </div>
                        <p className="agree_scroll">Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe </p>
                    </div>
                </fieldset>
                <button type="submit">회원가입 하기</button>
            </form>
        </div>
    )
}

export default Join;