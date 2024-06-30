import { useState } from 'react';
import '../../css/join.css'
import { Post } from '../Fetch';
import { useNavigate } from 'react-router-dom';

const Join = () => {

    const navigate = useNavigate();
    const [value, setValue] = useState({id: "", pw: "", pwCheck: "", email: "", name: "", regnumFront: "", regnumBack: ""});
    const [valid, setValid] = useState({id:false, pw:false, pwCheck:false, email:false});
    const [visiblePW, setVisiblePW] = useState({ pw1: false, pw2: false }); // 비밀번호 암호화 해제 상태
    const regex = {
        id: /^[a-zA-Z0-9]{6,20}$/i,
        pw: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
        email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    };

    //value값 추가
    const handleValue = (e, type) => {
        const newValue = e.target.value;
        setValue(preValue => ({...preValue, [type]: newValue}));
    }

    // //유효성 확인 공통 함수
    const handleValid = (e, type) => {
        const newValue = e.target.value;
        let isValid;
        
        if(type === "pwCheck"){
            isValid = newValue === value.pw;
        } else {
            isValid = regex[type].test(newValue); //text함수에 state값을 넣고 정규식을 확인한다
        }
        
        setValid(preValid => ({...preValid, [type]: isValid}));
        setValue(preValue => ({...preValue, [type]: newValue})); //input에 입력된 함수를 state값에 넣어주기
    };

    // pw 암호화 토글
    const handleVisiblePW = (pwType) => {
        setVisiblePW(prevState => ({ ...prevState, [pwType]: !prevState[pwType] }));
    };

    //id 중복확인
    const dupID = async() => {
        const json = {"userid": value.id};
        const result = await Post("/api/user/duplicate", json);
        console.log(result);
    }

    //email 인증 및 중복확인
    const checkEmail = async() => {
        const json = { "email": value.email };
        const result = await Post("/api/user/email",json);
        console.log(result);
    }
    
    //회원가입
    const submitJoin = async() => {
        const json = {
            "userid" : value.id,
            "password" : value.pw,
            "email": value.email,
            "name": value.name,
            "regnum" : `${value.regnumFront} - ${value.regnumBack}`,
            // "nickname" : ,
        };
        const result = await Post("/api/user",json);
        alert('가입이 완료되었습니다.')
        navigate('/');
        console.log(result);
    }

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
                                <input type='text' name="idInput" id="idInput" value={value.id} onChange={(e) => handleValid(e, 'id')} title="아이디 입력" />
                                <span className="material-symbols-outlined" style={valid.id ? {color:'#32AC72'} : {}}>check_circle</span>
                            </div>
                            <div className='warn_box'>
                                <p className='success' style={valid.id ? {display:'block'} : {}}>사용 가능한 아이디입니다.</p>
                                {!valid.id && value.id.length > 0 && (
                                    <>
                                        <p>올바른 아이디를 입력해주세요.</p>
                                        <p>6글자 이상, 최대 20글자 이내 / 특수문자, 한글 사용 불가</p>
                                    </>
                                )}
                                <button className='check' onClick={dupID}>중복확인</button>
                            </div>
                        </div>
                    </div>
                    <div className='pw1_box'>
                        <h5>비밀번호</h5>
                        <div>
                            <div>
                                <input type={visiblePW.pw1?'text':'password'} name="pwInput" id="pwInput" value={value.pw} onChange={(e) => handleValid(e, 'pw')} title="비밀번호 입력" />
                                <span className="material-symbols-outlined" onClick={()=>handleVisiblePW('pw1')}>{visiblePW.pw1?'visibility':'visibility_off'}</span>
                            </div>
                            <div className='warn_box'>
                                <p className='success' style={valid.pw === true ? {display:'block'} : {}}>사용 가능한 비밀번호입니다.</p>
                                {!valid.pw && value.pw.length > 0 && (
                                    <>
                                        <p>올바른 비밀번호를 입력해주세요.</p>
                                        <p>8글자 이상, 대문자, 숫자, 특수문자 1글자 이상 사용 / 한글 사용 불가</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='pw2_box'>
                        <h5>비밀번호 확인</h5>
                        <div>
                            <div>
                                <input type={visiblePW.pw2?'text':'password'} name="pwCheckInput" id="pwCheeckInput" value={value.pwCheck} onChange={(e)=>handleValid(e, "pwCheck")} title="비밀번호 확인" />
                                <span className="material-symbols-outlined">check_circle</span>
                                <span className="material-symbols-outlined" onClick={()=>handleVisiblePW('pw2')}>{visiblePW.pw2?'visibility':'visibility_off'}</span>
                            </div>
                            <div className='warn_box'>
                                <p className='success' style={valid.pwCheck ? {display:'block'} : {}}>비밀번호가 일치합니다.</p>
                                {!valid.pwCheck && value.pwCheck.length > 0 && (
                                    <p>비밀번호가 일치하지 않습니다.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='email_box'>
                        <h5>이메일</h5>
                        <div>
                            <div>
                                <input type='text' name="emailInput" id="emailInput" value={value.email} onChange={(e) => handleValid(e, 'email')} title="이메일 입력" />
                            </div>
                            <div className='warn_box'>
                                <p className='success' style={valid.email === true ?{display:'block'} : {}}>사용 가능한  이메일입니다.</p>
                                {!valid.email && value.email.length > 0 && (
                                    <>
                                        <p>이메일 주소 형식으로 입력해주세요.</p>
                                    </>
                                )}
                                <button className='check' onClick={checkEmail}>이메일 인증하기</button>
                            </div>
                        </div>
                    </div>
                    <div className='name_box'>
                        <h5>이름</h5>
                        <div>
                            <input type='text' name='nameInput' value={value.name} onChange={(e)=>handleValue(e, 'name')}></input>
                        </div>
                    </div>
                    <div className='RRN_box'>
                        <h5>주민등록번호</h5>
                        <div>
                            <input type='number' className='RRN1' onChange={(e)=>handleValue(e, 'regnumFront')} maxLength={6} minLength={6}></input>
                            <span>-</span>
                            <input type='number' className='RRN2' onChange={(e)=>handleValue(e, 'regnumBack')}></input>
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
                <button type="submit" onClick={submitJoin}>회원가입 하기</button>
            </form>
        </div>
    )
}

export default Join;