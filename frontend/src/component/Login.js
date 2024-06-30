import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return(
        <div className="Login">
            <button 
                onClick={()=> navigate('/join')}
                style={{fontSize: "24px", padding: "10px 15px", border: "2px solid #888"}}
            >
                회원가입
            </button>
        </div>
    )
};

export default Login;