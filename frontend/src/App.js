import './App.css';
import { BrowserRouter } from 'react-router-dom';
import LoginMain from './component/login/Main';
// import Login from './component/login/Login';
// import Join from './pages/Join';
// import Search from './component/login/Search';
// import SearchPw from './component/login/SearchPw';


function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <LoginMain/>
            </div>
        </BrowserRouter>
    );
}

export default App;
