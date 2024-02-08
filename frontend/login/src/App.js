import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/login/Login';
import Join from './pages/Join';
import Search from './component/login/Search';


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
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
