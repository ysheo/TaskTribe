import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/login/Login';
import Join from './pages/Join';
import Search from './component/login/Search';
import SearchPw from './component/login/SearchPw';


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div id='title'>
                    <h1 className='logo'>Task Tribe</h1>
                </div>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/join' element={<Join />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/searchpw' element={<SearchPw />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
