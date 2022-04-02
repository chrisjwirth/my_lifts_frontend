import React, { useState } from "react";
import { Button, Heading, Show, useToast } from "@chakra-ui/react";
import CreateUpdateDeleteExercise from "../exercise/CreateUpdateDeleteExercise";
import { useNavigate } from "react-router-dom";
import { parseISO } from "date-fns";
import DesktopWorkoutForm from "./DesktopWorkoutForm";
import MobileWorkoutForm from "./MobileWorkoutForm";

export const CreateUpdateDeleteWorkout = ({ workoutToEdit }) => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const toast = useToast();

  const [workoutID, setWorkoutID] = useState(workoutToEdit?.id ?? "");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(workoutToEdit?.name ?? "");
  const [date, setDate] = useState(() =>
    workoutToEdit ? parseISO(workoutToEdit?.date) : new Date()
  );
  const [location, setLocation] = useState(workoutToEdit?.location ?? "");
  const [notes, setNotes] = useState(workoutToEdit?.notes ?? "");
  const [exerciseNumbers, setExerciseNumbers] = useState(
    [...Array(workoutToEdit?.exercises.length).keys()] ?? [0]
  );

  const postData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const newWorkout = {
      name,
      date: date.toISOString().split("T")[0],
      location,
      notes,
    };
    const response = await fetch(`${BASE_URL}/workouts/`, {
      method: "POST",
      body: JSON.stringify(newWorkout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setWorkoutID(data.id);
    setLoading(false);
  };

  const putData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const workout = {
      name,
      date: date.toISOString().split("T")[0],
      location,
      notes,
    };
    const response = await fetch(`${BASE_URL}/workouts/${workoutID}/`, {
      method: "PUT",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    setLoading(false);
    toast({
      title: "Workout updated.",
      description: "The workout was updated successfully",
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(`${BASE_URL}/workouts/${workoutID}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    setLoading(false);
    toast({
      title: "Workout deleted.",
      description: "The workout was deleted successfully",
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/all-workouts");
  };

  const addExercise = () => {
    setExerciseNumbers([...exerciseNumbers, exerciseNumbers.length]);
  };

  const deleteExercise = (toDelete) => {
    setExerciseNumbers(
      exerciseNumbers.filter((exerciseNum) => exerciseNum !== toDelete)
    );
  };

  return (
    <>
      {errors === true && <Heading size="xl">Error Creating Workout</Heading>}
      <Show above="md">
        <DesktopWorkoutForm
          loading={loading}
          workoutID={workoutID}
          name={name}
          setName={setName}
          date={date}
          setDate={setDate}
          location={location}
          setLocation={setLocation}
          notes={notes}
          setNotes={setNotes}
          postData={postData}
          putData={putData}
          deleteData={deleteData}
        />
      </Show>
      <Show below="md">
        <MobileWorkoutForm
          loading={loading}
          workoutID={workoutID}
          name={name}
          setName={setName}
          date={date}
          setDate={setDate}
          location={location}
          setLocation={setLocation}
          notes={notes}
          setNotes={setNotes}
          postData={postData}
          putData={putData}
          deleteData={deleteData}
        />
      </Show>
      {exerciseNumbers.map((exerciseNum) => (
        <CreateUpdateDeleteExercise
          exerciseNum={exerciseNum}
          workoutID={workoutID}
          exerciseToEdit={workoutToEdit?.exercises[exerciseNum]}
          deleteExercise={deleteExercise}
          key={exerciseNum}
        />
      ))}
      {workoutID && <Button onClick={addExercise}>Add Exercise</Button>}
    </>
  );
};

export default CreateUpdateDeleteWorkout;
