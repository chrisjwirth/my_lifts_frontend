import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import CreateUpdateDeleteExercise from "../exercise/CreateUpdateDeleteExercise";
import { useNavigate } from "react-router-dom";
import DeleteButtonWithWarning from "./DeleteButtonWithWarning";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { parseISO } from "date-fns";

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
      <form onSubmit={workoutID ? putData : postData}>
        <SimpleGrid
          columns={{ base: 2, md: 10 }}
          columnGap={3}
          rowGap={3}
          w="full"
        >
          <GridItem colSpan={{ base: 2, md: 2 }}>
            <FormControl>
              <FormLabel htmlFor="name">Workout Name</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 2 }}>
            <FormControl>
              <FormLabel htmlFor="date">Date</FormLabel>
              <SingleDatepicker
                id="date"
                name="date"
                date={date}
                onDateChange={(date) => setDate(date)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                name="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 3 }}>
            <FormControl>
              <FormLabel htmlFor="notes">Notes</FormLabel>
              <Input
                id="notes"
                name="notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="save">Save</FormLabel>
              <Button
                id="save"
                type="submit"
                w="full"
                colorScheme="brand"
                isLoading={loading}
                spinnerPlacement="end"
              >
                {workoutID ? "Update" : "Create"}
              </Button>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="delete">Delete</FormLabel>
              <DeleteButtonWithWarning
                id="delete"
                deleteText="Delete"
                isDisabled={!workoutID}
                deleteFunction={deleteData}
              />
            </FormControl>
          </GridItem>
        </SimpleGrid>
      </form>
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
