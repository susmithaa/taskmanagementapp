import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Tasks from "./Task"; 
import AddTask from "./AddTask";    

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<Tasks /> }/>
        <Route path="/addtask" element={<AddTask />} />
      </Routes>
    </Router>
  );
}

export default App;