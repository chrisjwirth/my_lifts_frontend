import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  toast,
  useToast,
  VStack,
} from "@chakra-ui/react";
import CreateUpdateDeleteSet from "../set/CreateUpdateDeleteSet";

export const CreateUpdateDeleteExercise = ({
  exerciseNum,
  workoutID,
  exerciseToEdit,
  deleteExercise,
}) => {
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
  const [setCount, setSetCount] = useState(exerciseToEdit?.sets.length ?? 1);
  const [setNumbers, setSetNumbers] = useState(
    [...Array(exerciseToEdit?.sets.length).keys()] ?? [0]
  );

  const postData = async event => {
    event.preventDefault();
    setLoading(true);
    const newExercise = { name, variation, description, notes };
    const response = await fetch(`/api/v1/workouts/${workoutID}/exercises/`, {
      method: "POST",
      body: JSON.stringify(newExercise),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setExerciseID(data.id);
    setLoading(false);
  };

  const putData = async event => {
    event.preventDefault();
    setLoading(true);
    const exercise = { name, variation, description, notes };
    const response = await fetch(
      `/api/v1/workouts/${workoutID}/exercises/${exerciseID}/`,
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

  const deleteData = async event => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(
      `/api/v1/workouts/${workoutID}/exercises/${exerciseID}/`,
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
    deleteExercise(exerciseNum);
  };

  const addSet = () => {
    setSetNumbers([...setNumbers, setNumbers.length]);
  };

  const deleteSet = toDelete => {
    setSetNumbers(setNumbers.filter(setNum => setNum !== toDelete));
  };

  return (
    <>
      {errors === true && <Heading size="xl">Error Creating Exercise</Heading>}
      {workoutID && (
        <Stack border="1px" spacing="24px" p={5} w="full" h="full">
          <form onSubmit={exerciseID ? putData : postData}>
            <SimpleGrid
              columns={{ base: 2, md: 9 }}
              columnGap={3}
              rowGap={3}
              w="full"
            >
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel htmlFor="name">Exercise Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    required
                    onChange={e => setName(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <FormControl>
                  <FormLabel htmlFor="variation">Variation</FormLabel>
                  <Input
                    id="variation"
                    name="variation"
                    type="text"
                    value={variation}
                    onChange={e => setVariation(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel htmlFor="notes">Notes</FormLabel>
                  <Input
                    id="notes"
                    name="notes"
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  />
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
                    {exerciseID ? "Update" : "Create"}
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
                    isDisabled={!exerciseID}
                    isLoading={loading}
                    spinnerPlacement="end"
                  >
                    Delete
                  </Button>
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </form>
          {setNumbers.map(setNum => (
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
};

export default CreateUpdateDeleteExercise;
