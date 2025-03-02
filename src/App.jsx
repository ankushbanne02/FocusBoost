import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Pomodoro from "./components/Pomodoro";
import Puzzle from "./components/Puzzle";
import TodoList from "./components/TodoList";

const App = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pomodoro", path: "/pomodoro" },
    { name: "Play Game", path: "/puzzle" },
    { name: "My To-Do List", path: "/todo" },
  ];

  return (
    <Router>
      <Navbar logo="./Landing Page/logo_black.png" links={navLinks} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </Router>
  );
};

export default App;