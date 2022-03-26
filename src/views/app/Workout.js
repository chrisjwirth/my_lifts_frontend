import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import CreateUpdateDeleteWorkout from "../../components/app/workout/CreateUpdateDeleteWorkout";
import WorkoutTimer from "../../components/app/workout/WorkoutTimer";

export const Workout = ({ workoutToEdit }) => {
  return (
    <>
      <Flex justify="Center">
        <Stack w="full" h="full" p={10} m={10} spacing={5} border="1px">
          <WorkoutTimer />
          <CreateUpdateDeleteWorkout workoutToEdit={workoutToEdit} />
        </Stack>
      </Flex>
    </>
  );
};

export default Workout;
