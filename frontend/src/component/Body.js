import React from "react";
import Login from "./Login";
import Join from "./join/Join";
import Main from "./Main";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const Body = () => {
    return (
      <div className="Body">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/join" element={<Join/>} />
                <Route path="/main" element={<Main/>} />
            </Routes>
        </BrowserRouter>
      </div>
    );
};

export default Body;