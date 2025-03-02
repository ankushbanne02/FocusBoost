import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ links }) => {
  return (
    <nav id="nav">
      <header id="nav-part1">
        <img src="" alt="Logo" /> {/* Logo in the public folder */}
      </header>
      <ul id="nav-part2">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;