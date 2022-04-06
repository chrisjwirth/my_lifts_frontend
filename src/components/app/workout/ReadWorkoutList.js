import React from "react";
import ReadWorkout from "./ReadWorkout";
import { Accordion, Divider, Show, Stack } from "@chakra-ui/react";

function ReadWorkoutList({ workouts, setWorkoutToEdit }) {
  return (
    <Stack w="full" h="full" spacing={2}>
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
        <Divider />
      </Show>
    </Stack>
  );
}

export default ReadWorkoutList;
