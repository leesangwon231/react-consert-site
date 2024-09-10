import React from "react";
import { Routes, Route } from "react-router-dom";
import PerformancesList from "./pages/Location/component/PerformancesList";

const App = () => {
    return (
        <Routes>
            <Route path="/performances" element={<PerformancesList />} />
        </Routes>
    );
};

export default App;
