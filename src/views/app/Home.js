import React from "react";
import { Link as ReactRouter } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  HStack,
  Image,
  Link,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function Home() {
  return (
    <Flex justify="Center" p={5}>
      <VStack
        divider={<StackDivider borderColor="brand.200" />}
        spacing={10}
        align="stretch"
      >
        <Flex justify="space-between" gap={5}>
          <Flex direction="column" justify="center" p={5} gap={5}>
            <Box>
              <Heading as="h1">Get fit one lift at a time</Heading>
              <Text fontSize="2xl">
                With My Lifts, you can easily record your workouts and track
                your progression.
              </Text>
            </Box>
            <HStack>
              <Button
                as={ReactRouter}
                to="/sign-up"
                leftIcon={<ArrowDownIcon />}
                colorScheme="brand"
                variant="solid"
              >
                Sign Up
              </Button>
              <Button
                as={ReactRouter}
                to="/log-in"
                rightIcon={<ArrowForwardIcon />}
                colorScheme="brand"
                variant="outline"
              >
                Log In
              </Button>
            </HStack>
          </Flex>
          <Hide below="md">
            <Image
              src="https://images.unsplash.com/photo-1580051745101-2dca6e53f15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
              alt="weights"
              w={600}
            />
          </Hide>
        </Flex>
        <Flex direction="column" justify="center" alignItems="center" gap={2}>
          <Heading size="xl">
            “There are no shortcuts — everything is reps, reps, reps.”
          </Heading>
          <Heading size="lg">― Arnold Schwarzenegger</Heading>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default Home;
