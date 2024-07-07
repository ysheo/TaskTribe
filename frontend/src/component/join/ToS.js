const ToS = ({agree, setAgree}) => {

    const handleAgree = (agreementType) => {
        if(agreementType === 'ToS'){
            setAgree(agreement => ({ ...agreement, [agreementType]: !agreement[agreementType]}));
        }
    };

    return(
        <div className="ToS">
            <div className="all agree">
                <div className="title">
                    <span className="material-symbols-outlined">check_circle</span>
                    <p>전체 동의하기</p>
                </div>
                <p className="text">이용약관(필수), 개인정보 수집 및 이용(필수)의 동의를 포함합니다.</p>
            </div>
            <div className="use agree">
                <div className="title" onClick={() => handleAgree('ToS')}>
                    <span className={agree?'material-symbols-outlined success' : 'material-symbols-outlined'}>check_circle</span>
                    <p>이용약관<span>(필수)</span></p>
                </div>
                <p className="text scroll">Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe </p>
            </div>
            <div className="info agree">
                <div className="title">
                    <span className="material-symbols-outlined">check_circle</span>
                    <p>개인정보 수집 및 이용<span>(필수)</span></p>
                </div>
                <p className="text scroll">Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe Task Tribe </p>
            </div>
        </div>
    )
}

export default ToS;