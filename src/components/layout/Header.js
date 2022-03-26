import React from "react";
import NavBar from "./NavBar";

function Header({ isLoggedIn }) {
  return (
    <header>
      <NavBar isLoggedIn={isLoggedIn} />
    </header>
  );
}

export default Header;
