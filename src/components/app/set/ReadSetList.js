import React from "react";
import ReadSet from "./ReadSet";
import { Stack } from "@chakra-ui/react";

function ReadSetList({ sets }) {
  return (
    <Stack w="full" h="full" my={2} spacing="2px">
      {sets.map((set, i) => (
        <ReadSet set={set} key={i} />
      ))}
    </Stack>
  );
}

export default ReadSetList;
