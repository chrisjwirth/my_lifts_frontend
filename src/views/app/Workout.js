import React from "react";
import { Flex, Stack, useBreakpointValue } from "@chakra-ui/react";
import CreateUpdateDeleteWorkout from "../../components/app/workout/CreateUpdateDeleteWorkout";
import WorkoutTimer from "../../components/app/workout/WorkoutTimer";

function Workout({ workoutToEdit }) {
  const border = useBreakpointValue({ base: "none", md: "1px" });

  return (
    <>
      <Flex justify="Center">
        <Stack
          w="full"
          h="full"
          p={[5, 10]}
          m={[2, 4, 10]}
          spacing={5}
          border={border}
        >
          <WorkoutTimer />
          <CreateUpdateDeleteWorkout workoutToEdit={workoutToEdit} />
        </Stack>
      </Flex>
    </>
  );
}

export default Workout;
