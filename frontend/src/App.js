import './App.css';
import React from "react";
import Login from "./Login";
import Join from "./join/Join";
import Main from "./Main";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <div className="Body">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/join" element={<Join/>} />
                        <Route path="/main" element={<Main/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
