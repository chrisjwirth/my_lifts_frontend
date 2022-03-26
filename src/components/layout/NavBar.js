import React, { useEffect, useState } from "react";
import { Link as ReactRouter } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Link,
  Show,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileNavLinks from "./MobileNavLinks";

function NavBar({ isLoggedIn }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav>
      <Flex px={5} justify="space-between">
        <Box p={2}>
          <Heading
            as={ReactRouter}
            to="/"
            color={colorMode === "light" ? "brand.400" : "brand.200"}
          >
            My Lifts
          </Heading>
        </Box>
        <Spacer />
        <Show above="md">
          <DesktopNavLinks isLoggedIn={isLoggedIn} />
        </Show>
        <Show below="md">
          <MobileNavLinks isLoggedIn={isLoggedIn} />
        </Show>
      </Flex>
    </nav>
  );
}

export default NavBar;
