import Login from './Login';
// import Join from '../../pages/Join';
import Search from './Search';
import SearchPw from './SearchPw';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const LoginMain = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div id='title'>
                    <h1 className='logo' onClick={() => navigate('/')}>Task Tribe</h1>
                </div>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/join' element={<Login />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/searchpw' element={<SearchPw />} />
                </Routes>
        </div>
    );

}

export default LoginMain;
