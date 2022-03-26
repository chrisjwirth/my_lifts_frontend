import React from "react";
import { Text } from "@chakra-ui/react";

function ReadSet({ set }) {
  return (
    <Text fontSize="xl">
      Set: {set.set_number} | Weight: {set.weight} | Reps: {set.reps}
    </Text>
  );
}

export default ReadSet;
