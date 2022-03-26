import React from "react";
import { Link as ReactRouter } from "react-router-dom";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function MobileNavLinks({ isLoggedIn }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem as={ReactRouter} to="/">
            Home
          </MenuItem>
          <MenuItem onClick={toggleColorMode}>
            {colorMode === "light" ? "Dark Mode" : "Light Mode"}
          </MenuItem>
          {isLoggedIn === true ? (
            <>
              <MenuItem as={ReactRouter} to="/templates">
                My Templates
              </MenuItem>
              <MenuItem as={ReactRouter} to="/all-workouts">
                My Workouts
              </MenuItem>
              <MenuItem as={ReactRouter} to="/log-out">
                Log out
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem as={ReactRouter} to="/log-in">
                Log In
              </MenuItem>
              <MenuItem as={ReactRouter} to="/sign-up">
                Sign Up
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </>
  );
}

export default MobileNavLinks;
