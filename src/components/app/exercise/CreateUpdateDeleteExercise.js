import React, { useState } from "react";
import {
  Button,
  Divider,
  Heading,
  Show,
  Stack,
  useToast,
} from "@chakra-ui/react";
import CreateUpdateDeleteSet from "../set/CreateUpdateDeleteSet";
import DesktopExerciseForm from "./DesktopExerciseForm";
import MobileExerciseForm from "./MobileExerciseForm";

function CreateUpdateDeleteExercise({
  exerciseNum,
  workoutID,
  exerciseToEdit,
  deleteExercise,
}) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const toast = useToast();

  const [exerciseID, setExerciseID] = useState(exerciseToEdit?.id ?? "");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(exerciseToEdit?.name ?? "");
  const [variation, setVariation] = useState(exerciseToEdit?.variation ?? "");
  const [description, setDescription] = useState(
    exerciseToEdit?.description ?? ""
  );
  const [notes, setNotes] = useState(exerciseToEdit?.notes ?? "");
  const [setNumbers, setSetNumbers] = useState(
    [...Array(exerciseToEdit?.sets.length).keys()] ?? [0]
  );

  const postData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const newExercise = { name, variation, description, notes };
    const response = await fetch(
      `${BASE_URL}/workouts/${workoutID}/exercises/`,
      {
        method: "POST",
        body: JSON.stringify(newExercise),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    setExerciseID(data.id);
    setLoading(false);
  };

  const putData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const exercise = { name, variation, description, notes };
    const response = await fetch(
      `${BASE_URL}/workouts/${workoutID}/exercises/${exerciseID}/`,
      {
        method: "PUT",
        body: JSON.stringify(exercise),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    setLoading(false);
    toast({
      title: "Exercise updated.",
      description: "The exercise was updated successfully",
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteData = async (event) => {
    event.preventDefault();
    if (exerciseID) {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/workouts/${workoutID}/exercises/${exerciseID}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      toast({
        title: "Exercise deleted.",
        description: "The exercise was deleted successfully",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    deleteExercise(exerciseNum);
  };

  const addSet = () => {
    setSetNumbers([...setNumbers, setNumbers.length]);
  };

  const deleteSet = (toDelete) => {
    setSetNumbers(setNumbers.filter((setNum) => setNum !== toDelete));
  };

  return (
    <>
      {errors === true && <Heading size="xl">Error Creating Exercise</Heading>}
      {workoutID && (
        <Stack border="1px" spacing="24px" p={4} w="full" h="full">
          <Show above="md">
            <DesktopExerciseForm
              loading={loading}
              exerciseID={exerciseID}
              name={name}
              setName={setName}
              variation={variation}
              setVariation={setVariation}
              description={description}
              setDescription={setDescription}
              notes={notes}
              setNotes={setNotes}
              postData={postData}
              putData={putData}
              deleteData={deleteData}
            />
          </Show>
          <Show below="md">
            <MobileExerciseForm
              loading={loading}
              exerciseID={exerciseID}
              name={name}
              setName={setName}
              variation={variation}
              setVariation={setVariation}
              description={description}
              setDescription={setDescription}
              notes={notes}
              setNotes={setNotes}
              postData={postData}
              putData={putData}
              deleteData={deleteData}
            />
          </Show>
          <Divider />
          {setNumbers.map((setNum) => (
            <CreateUpdateDeleteSet
              setNum={setNum}
              workoutID={workoutID}
              exerciseID={exerciseID}
              setToEdit={exerciseToEdit?.sets[setNum]}
              deleteSet={deleteSet}
              key={setNum}
            />
          ))}
          {exerciseID && <Button onClick={addSet}>Add Set</Button>}
        </Stack>
      )}
    </>
  );
}

export default CreateUpdateDeleteExercise;
