import React from "react";
import { Link as ReactRouter } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Show,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileNavLinks from "./MobileNavLinks";
import LightLogo from "../../theme/LightLogo";
import DarkLogo from "../../theme/DarkLogo";

function NavBar({ isLoggedIn, demoInProgress }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav>
      <Flex px={5} my={1} justify="space-between" alignItems="center">
        <Box>
          <Heading
            as={ReactRouter}
            to="/"
            color={colorMode === "light" ? "brand.400" : "brand.200"}
          >
            <Box width={[150, 200]}>
              {colorMode === "light" ? <LightLogo /> : <DarkLogo />}
            </Box>
          </Heading>
        </Box>
        <Spacer />
        <Show above="md">
          <DesktopNavLinks
            isLoggedIn={isLoggedIn}
            demoInProgress={demoInProgress}
          />
        </Show>
        <Show below="md">
          <MobileNavLinks
            isLoggedIn={isLoggedIn}
            demoInProgress={demoInProgress}
          />
        </Show>
      </Flex>
    </nav>
  );
}

export default NavBar;
