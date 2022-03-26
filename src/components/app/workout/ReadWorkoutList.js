import React from "react";
import ReadWorkout from "./ReadWorkout";
import { Accordion, Show, Stack } from "@chakra-ui/react";

const ReadWorkoutList = ({ workouts, setWorkoutToEdit }) => {
  return (
    <Stack w="full" h="full" spacing={5}>
      <Show below="md">
        <Accordion defaultIndex={[0]} allowMultiple>
          {workouts.map((workout, i) => (
            <ReadWorkout
              workout={workout}
              key={i}
              setWorkoutToEdit={setWorkoutToEdit}
            />
          ))}
        </Accordion>
      </Show>
      <Show above="md">
        {workouts.map((workout, i) => (
          <ReadWorkout
            workout={workout}
            key={i}
            setWorkoutToEdit={setWorkoutToEdit}
          />
        ))}
      </Show>
    </Stack>
  );
};

export default ReadWorkoutList;
