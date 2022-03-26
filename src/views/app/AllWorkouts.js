import React, { useEffect, useState } from "react";
import { Link as ReactRouter } from "react-router-dom";
import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
import ReadWorkoutList from "../../components/app/workout/ReadWorkoutList";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const AllWorkouts = ({ setWorkoutToEdit }) => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [workouts, setWorkouts] = useState([]);

  const loadWorkouts = async () => {
    const response = await fetch(`${BASE_URL}/workouts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setWorkouts(data.reverse());
  };

  useEffect(() => {
    loadWorkouts();
    setWorkoutToEdit();
  }, []);

  return (
    <VStack m={5} spacing={5}>
      <Flex w="full" justify="space-between" align="center">
        <Heading as="h1" size="2xl">
          All Workouts
        </Heading>
        <Button
          as={ReactRouter}
          to="/workout"
          rightIcon={<ArrowForwardIcon />}
          colorScheme="brand"
          variant="outline"
          m={0}
        >
          New Workout
        </Button>
      </Flex>
      <ReadWorkoutList
        workouts={workouts}
        setWorkoutToEdit={setWorkoutToEdit}
      />
    </VStack>
  );
};

export default AllWorkouts;
