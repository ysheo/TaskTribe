import { useEffect, useRef, useState } from 'react';
import '../../css/join.css'
import { Post } from '../Fetch';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import ToS from './ToS';

const Join = () => {

    const navigate = useNavigate();
    //input change 값
    const [value, setValue] = useState({id: "", pw: "", pwCheck: "", email: "", name: "", regnumFront: "", regnumBack: "", nickname: ""});
    //유효성 통과 유무
    const [valid, setValid] = useState({id:false, pw:false, pwCheck:false, email:false, name:false, regnumFront:false, regnumBack:false, nickname:false});
    //중복확인 및 이메일 인증
    const [confirm, setConfirm] = useState({id: false, email: false});
    //이메일 상태 문구
    const [emailStatus, setEmailStatus] = useState('');
    //input 암호화(토글)
    const [visiblePW, setVisiblePW] = useState({ pw1: false, pw2: false });
    //정규식
    const regex = {
        id: /^[a-zA-Z0-9]{6,20}$/i,
        pw: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
        email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
        regnumFront: /^\d{6}$/
    };
    //주민번호 자동 포커싱 되기 위한 ref
    const regnumRef = useRef({ front: null, back: null });
    //이용약관 동의
    const [agree, setAgree] = useState({ToS: false, privacy: false});

    //유효성 확인 공통 함수
    const handleValid = (e, type) => {
        const newValue = e.target.value;
        let isValid;

        // 유효성 확인
        if(type === "pwCheck"){
            isValid = newValue === value.pw;
        } else if (type === "regnumBack" || type === "name" || type === "nickname"){
            isValid = newValue.length > 0;
        } else {
            isValid = regex[type].test(newValue);
        } 
        setValid(preValid => ({...preValid, [type]: isValid}));
        
        // Value값 변경 및 onChange 이벤트
        if(type === "regnumFront" || type === "regnumBack"){
            if( /^\d*$/.test(newValue)){
                setValue(preValue => ({ ...preValue, [type]: newValue })); 
            }
        } else{
            setValue(preValue => ({ ...preValue, [type]: newValue }));
        };
    };

    // pw 암호화 토글
    const handleVisiblePW = (pwType) => {
        setVisiblePW(prevState => ({ ...prevState, [pwType]: !prevState[pwType] }));
    };

    //id 중복확인
    const dupID = async() => {
        const json = {"userid": value.id};
        const result = await Post("/api/user/duplicate", json);
        result === '중복'?
            alert('이미 가입된 아이디 입니다. 다른 아이디를 입력해주십시오.')
            :setConfirm(preConfirm => ({...preConfirm, id: result !== '중복' && valid.id}));
    }

    //email 인증 및 중복확인
    const checkEmail = async() => {
        const json = { "email": value.email };
        const result = await Post("/api/user/email",json);
        if (result === '') {
            // 코드 인증한 뒤에 응답 받아서 true값으로 바꿔야함
            setConfirm(preConfirm => ({ ...preConfirm, email: true }));
            setEmailStatus('해당 이메일에서 인증해주세요.')
        } else if (result === '이메일 중복'){
            setEmailStatus('이미 가입된 이메일 입니다.')
        } else if (result === '인증 메일 전송 완료'){
            setEmailStatus('해당 메일로 인증 메일을 보냈습니다.')
        }
    };

    //주민번호 focus 이동
    useEffect(()=>{
        if (value.regnumFront.length === 6) {
            regnumRef.current.back.focus();
        }
    }, [value.regnumFront]);
    
    const allValid = () => {
        return Object.values(valid).every(Boolean) && Object.values(confirm).every(Boolean);
    };

    //회원가입
    const submitJoin = async() => {
        if(allValid()){
            const json = {
                "userid" : value.id,
                "password" : value.pw,
                "email": value.email,
                "name": value.name,
                "regnum" : `${value.regnumFront}-${value.regnumBack}`,
                "nickname" : value.nickname
            };
            const result = await Post("/api/user",json);
            alert('가입이 완료되었습니다.')
            navigate('/');
            console.log(result);
        } else {
            alert('모든 입력창을 올바르게 작성 후 중복 확인 및 이메일 인증을 반드시 완료해주세요.')
        }
    }

    return(
        <div className="join">
            <h1 className='logo'>Task Tribe</h1>
            <h3>Sign Up</h3>
            <form className='personal_info' action="#" method="post">
                <fieldset>

                    <InputField
                        label='아이디'
                        type='text'
                        name='idInput'
                        value={value.id}
                        onChange={(e) => handleValid(e, 'id')}
                        autoComplete='off'
                        valid={valid.id}
                        message="올바른 아이디를 입력해주세요. 6글자 이상, 최대 20글자 이내 / 특수문자, 한글 사용 불가"
                    />
                    <div className='duple'>
                        <p className='msg'></p>
                        <button className='check' onClick={dupID}>
                            중복확인
                        </button>
                    </div>

                    <InputField
                        label="비밀번호"
                        type="password"
                        name="pwInput"
                        value={value.pw}
                        onChange={(e) => handleValid(e, 'pw')}
                        autoComplete="off"
                        valid={valid.pw}
                        message="올바른 비밀번호를 입력해주세요. 8글자 이상, 대문자, 숫자, 특수문자 1글자 이상 사용 / 한글 사용 불가"
                        showToggle={true}
                        toggleVisible={() => handleVisiblePW('pw1')}
                        visible={visiblePW.pw1}
                    />

                    <InputField
                        label="비밀번호 확인"
                        type="password"
                        name="pwCheckInput"
                        value={value.pwCheck}
                        onChange={(e) => handleValid(e, "pwCheck")}
                        autoComplete="off"
                        valid={valid.pwCheck}
                        message="비밀번호가 일치하지 않습니다."
                        showToggle={true}
                        toggleVisible={() => handleVisiblePW('pw2')}
                        visible={visiblePW.pw2}
                    />

                    <InputField
                        label="이메일"
                        type="text"
                        name="emailInput"
                        value={value.email}
                        onChange={(e) => handleValid(e, 'email')}
                        autoComplete="off"
                        valid={valid.email}
                        message="이메일 주소 형식으로 입력해주세요."
                    />
                    <div className='duple'>
                        <p className='msg'>
                            {emailStatus}
                        </p> 
                        {/* 백엔드에 보내고 회신에따라 1. 메일 전송 표시 2. 이미 가입된 정보가 있는지 표시 (시간안에 미인증시 어떻게 할건지도 생각,, 지금은 초기 상태로 돌아가는건 어떨까 생각중) */}
                        <button className='check' onClick={checkEmail}>인증하기</button>
                    </div>

                    <InputField
                        label="이름"
                        type="text"
                        name="nameInput"
                        value={value.name}
                        onChange={(e) => handleValid(e, 'name')}
                        autoComplete="off"
                        valid={valid.name}
                        message="이름을 입력해주세요."
                    />

                    <div className='RRN inputBox'>
                        <h5>주민등록번호</h5>
                        <div className='content'>
                            <div className='text'>
                                <input type='text' className='RRN1' value={value.regnumFront} onChange={(e)=>handleValid(e, 'regnumFront')} ref={el => regnumRef.current.front = el} autoComplete='off'/>
                                <span>-</span>
                                <input type='text' className='RRN2' value={value.regnumBack} onChange={(e)=>handleValid(e, 'regnumBack')} ref={el => regnumRef.current.back = el} maxLength={1} autoComplete='off'/>
                                <span className='asterisk'>* * * * * *</span>
                            </div>
                            {!valid.regnumFront && value.regnumFront.length > 0 && (
                                <div className='warn_box'>
                                    <p>주민번호를 제대로 입력해주세요.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <InputField
                        label="닉네임"
                        type="text"
                        name="nicknameInput"
                        value={value.nickname}
                        onChange={(e) => handleValid(e, 'nickname')}
                        autoComplete="off"
                        valid={valid.nickname}
                        message="닉네임을 입력해주세요."
                    />

                </fieldset>
                <fieldset>
                    <ToS />
                </fieldset>
                <button type="submit" className='joinBtn' onClick={submitJoin}>회원가입 하기</button>
            </form>
        </div>
    )
}

export default Join;