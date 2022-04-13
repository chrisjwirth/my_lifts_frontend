import React from "react";
import { Link as ReactRouter } from "react-router-dom";
import { Flex, Link, useColorMode } from "@chakra-ui/react";

function DesktopNavLinks({ isLoggedIn, demoInProgress }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex gap={4} alignItems="center">
      <Link as={ReactRouter} to="/">
        Home
      </Link>
      |
      <Link onClick={toggleColorMode}>
        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
      </Link>
      |
      {isLoggedIn ? (
        <>
          <Link as={ReactRouter} to="/templates">
            My Templates
          </Link>
          |
          <Link as={ReactRouter} to="/all-workouts">
            My Workouts
          </Link>
          |
          <Link as={ReactRouter} to="/log-out">
            {demoInProgress ? "End Demo" : "Log out"}
          </Link>
        </>
      ) : (
        <>
          <Link as={ReactRouter} to="/sign-up">
            Sign Up
          </Link>
          |
          <Link as={ReactRouter} to="/log-in">
            Log In
          </Link>
        </>
      )}
    </Flex>
  );
}

export default DesktopNavLinks;
