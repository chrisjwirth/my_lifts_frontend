import React from "react";
import ReadExercise from "./ReadExercise";

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
