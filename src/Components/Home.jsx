import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <nav className="flex justify-between items-center p-4 shadow-md bg-white">
        
        <div className="flex space-x-6">
          <h4><Link to="/pomodoro" className="text-lg text-gray-700 hover:text-black">Pomodoro</Link></h4>
          <h4><Link to="/puzzle" className="text-lg text-gray-700 hover:text-black">Play Game</Link></h4>
          <h4><Link to="/todo" className="text-lg text-gray-700 hover:text-black">My To-Do List</Link></h4>
        </div>
      </nav>

      <div className="flex justify-center items-center h-full bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Get in the zone</h1>
      </div>
    </div>
  );
};

export default Home;
