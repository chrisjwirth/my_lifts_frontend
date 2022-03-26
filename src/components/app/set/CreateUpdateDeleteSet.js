import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";

export const CreateUpdateDeleteSet = ({
  setNum,
  workoutID,
  exerciseID,
  setToEdit,
  deleteSet,
}) => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const toast = useToast();

  const [setID, setSetID] = useState(setToEdit?.id ?? "");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [setNumber, setSetNumber] = useState(setToEdit?.set_number ?? "");
  const [weight, setWeight] = useState(setToEdit?.weight ?? "");
  const [reps, setReps] = useState(setToEdit?.reps ?? "");
  const [secondsWorking, setSecondsWorking] = useState(
    setToEdit?.seconds_working ?? ""
  );
  const [secondsResting, setSecondsResting] = useState(
    setToEdit?.seconds_resting ?? ""
  );

  const postData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const newSet = {
      set_number: setNumber,
      weight: weight,
      reps: reps,
      seconds_working: secondsWorking || null,
      seconds_resting: secondsResting || null,
    };
    const response = await fetch(
      `${BASE_URL}/workouts/${workoutID}/exercises/${exerciseID}/sets/`,
      {
        method: "POST",
        body: JSON.stringify(newSet),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    setSetID(data.id);
    setLoading(false);
  };

  const putData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const set = {
      set_number: setNumber,
      weight: weight,
      reps: reps,
      seconds_working: secondsWorking || null,
      seconds_resting: secondsResting || null,
    };
    const response = await fetch(
      `${BASE_URL}/workouts/${workoutID}/exercises/${exerciseID}/sets/${setID}/`,
      {
        method: "PUT",
        body: JSON.stringify(set),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    setLoading(false);
    toast({
      title: "Set updated.",
      description: "The set was updated successfully",
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(
      `${BASE_URL}/workouts/${workoutID}/exercises/${exerciseID}/sets/${setID}/`,
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
      title: "Set deleted.",
      description: "The set was deleted successfully",
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    deleteSet(setNum);
  };

  return (
    <>
      {errors === true && <Heading size="xl">Error Creating Set</Heading>}
      {exerciseID && (
        <form onSubmit={setID ? putData : postData}>
          <SimpleGrid
            columns={{ base: 2, md: 7 }}
            columnGap={3}
            rowGap={3}
            w="full"
          >
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl>
                <FormLabel htmlFor="setNumber">Set Number</FormLabel>
                <NumberInput
                  id="setNumber"
                  name="setNumber"
                  type="number"
                  value={setNumber}
                  min={1}
                  max={50}
                  required
                  onChange={(value) => setSetNumber(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel htmlFor="weight">Weight</FormLabel>
                <NumberInput
                  id="weight"
                  name="weight"
                  type="number"
                  value={weight}
                  min={0}
                  max={1500}
                  precision={1}
                  step={0.5}
                  required
                  onChange={(value) => setWeight(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel htmlFor="reps">Reps</FormLabel>
                <NumberInput
                  id="reps"
                  name="reps"
                  type="number"
                  value={reps}
                  min={0}
                  max={1500}
                  required
                  onChange={(value) => setReps(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel htmlFor="secondsWorking">Seconds Working</FormLabel>
                <NumberInput
                  id="secondsWorking"
                  name="secondsWorking"
                  type="number"
                  value={secondsWorking}
                  min={0}
                  max={6400}
                  onChange={(value) => setSecondsWorking(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel htmlFor="secondsResting">Seconds Resting</FormLabel>
                <NumberInput
                  id="secondsResting"
                  name="secondsResting"
                  type="number"
                  value={secondsResting}
                  min={0}
                  max={6400}
                  onChange={(value) => setSecondsResting(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel htmlFor="submit">Submit</FormLabel>
                <Button
                  id="submit"
                  type="submit"
                  w="full"
                  colorScheme="brand"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  {setID ? "Update" : "Create"}
                </Button>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel htmlFor="delete">Delete</FormLabel>
                <Button
                  id="delete"
                  onClick={deleteData}
                  w="full"
                  colorScheme="brand"
                  variant="outline"
                  isDisabled={!setID}
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  Delete
                </Button>
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </form>
      )}
    </>
  );
};

export default CreateUpdateDeleteSet;
