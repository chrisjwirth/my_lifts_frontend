import React from "react";
import ReadExerciseList from "../exercise/ReadExerciseList";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Show,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ReadWorkout({ workout, setWorkoutToEdit }) {
  const navigate = useNavigate();

  const editWorkout = () => {
    setWorkoutToEdit(workout);
    navigate("/workout");
  };

  return (
    <>
      <Show below="md">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {workout.name} | {workout.date.slice(0, 10)}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack spacing={5} w="full" h="full">
              <Flex justify="space-between">
                <Heading as="h2" size="xl">
                  {workout.name} | {workout.date.slice(0, 10)}
                </Heading>
                <Button onClick={editWorkout}>Edit</Button>
              </Flex>
              <ReadExerciseList exercises={workout.exercises} />
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Show>
      <Show above="md">
        <Divider />
        <Stack p={5} spacing={5} w="full" h="full">
          <Flex justify="space-between">
            <Heading as="h2" size="xl">
              {workout.name} | {workout.date.slice(0, 10)}
            </Heading>
            <Button onClick={editWorkout}>Edit</Button>
          </Flex>
          <ReadExerciseList exercises={workout.exercises} />
        </Stack>
      </Show>
    </>
  );
}

export default ReadWorkout;
