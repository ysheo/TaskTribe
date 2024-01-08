import './css/join.css'

const Join = () => {
    return(
        <div className="join">
            <h3>Sign Up</h3>
            <form className='personal_info'>
                <fieldset>
                    <div className='id_box'>
                        <p>아이디</p>
                        <div>
                            <div>
                                <input type='text'></input>
                                <span class="material-symbols-outlined">check_circle</span>
                            </div>
                            <div className='warn_box'>
                                <p className='success'>사용가능한 아이디입니다.</p>
                                <p className='fail'>사용 불가능한 아이디 입니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className='pw1_box'>
                        <p>비밀번호</p>
                        <input type='password'></input>
                    </div>
                    <div className='pw2_box'>
                        <p>비밀번호 확인</p>
                        <div>
                            <input type='password'></input>
                            <span class="material-symbols-outlined">check_circle</span>
                            <div className='warn_box'>
                                <p className='success'>비밀번호가 일치합니다.</p>
                                <p className='fail'>8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.</p>
                            </div>
                        </div>
                    </div>
                    <div className='email_box'>
                        <p>이메일</p>
                        <div>
                            <input type='text'></input>
                            <p className='fail'>이메일 주소가 정확한지 확인해주세요.</p>
                            <p className='check'>이메일 인증하기</p>
                        </div>
                    </div>
                    <div className='name_box'>
                        <p>이름</p>
                        <input type='text'></input>
                    </div>
                    <div className='RRN_box'>
                        <p>주민등록번호</p>
                        <div>
                            <input type='number' className='RRN1' maxLength={6} minLength={6}></input>
                            <span>-</span>
                            <input type='number' className='RRN2'></input>
                            <span>* * * * * *</span>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Join;