import React from "react";
import NavBar from "./NavBar";

function Header({ isLoggedIn, demoInProgress }) {
  return (
    <header>
      <NavBar isLoggedIn={isLoggedIn} demoInProgress={demoInProgress} />
    </header>
  );
}

export default Header;
