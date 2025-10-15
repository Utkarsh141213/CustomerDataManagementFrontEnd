import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import NextPage from "./NextPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/next-page" element={<NextPage />} />
    </Routes>
  );
}

export default App;