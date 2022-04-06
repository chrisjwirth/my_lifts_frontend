import React from "react";
import ReadSetList from "../set/ReadSetList";
import { Heading, Stack } from "@chakra-ui/react";

function ReadExercise({ exercise }) {
  return (
    <Stack
      w="full"
      h="full"
      p={5}
      spacing="5px"
      border="1px"
      borderColor="lightgray"
    >
      <Heading as="h3" size="md">
        {exercise.name}
      </Heading>
      <ReadSetList sets={exercise.sets} />
    </Stack>
  );
}

export default ReadExercise;
