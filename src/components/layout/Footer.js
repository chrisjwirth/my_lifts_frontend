import React from "react";
import { Flex, Link } from "@chakra-ui/react";

function Footer() {
  return (
    <footer>
      <Flex justify="center" my={1}>
        <Link href="https://github.com/chrisjwirth" isExternal>
          &copy; 2022 Christopher Wirth
        </Link>
      </Flex>
    </footer>
  );
}

export default Footer;
