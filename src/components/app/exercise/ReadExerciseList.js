import React from "react";
import ReadExercise from "./ReadExercise";
import { Stack } from "@chakra-ui/react";

function ReadExerciseList({ exercises }) {
  return (
    <>
      {exercises.map((exercise, i) => (
        <ReadExercise exercise={exercise} key={i} />
      ))}
    </>
  );
}

export default ReadExerciseList;
