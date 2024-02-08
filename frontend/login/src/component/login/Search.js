// import { useState } from "react";
// import './styles/login.scss';
// import { FaUser } from "react-icons/fa";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
    return(
        <div className="search">
            <h3>아이디 찾기</h3>
            <form>
            <fieldset>
                <div className="searchbounder">
                <button className="searchid">아이디 찾기</button>
                <button className="searchpw">비밀번호 찾기</button>
                </div>

            </fieldset>
        
            </form>
        </div>
    )
}

export default Search;