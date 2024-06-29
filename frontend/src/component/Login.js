import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return(
        <div className="Login">
            <button onClick={()=> navigate('/join')}>회원가입</button>
        </div>
    )
};

export default Login;