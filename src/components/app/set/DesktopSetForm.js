import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

function DesktopSetForm({
  loading,
  setID,
  setNumber,
  setSetNumber,
  weight,
  setWeight,
  reps,
  setReps,
  secondsWorking,
  setSecondsWorking,
  secondsResting,
  setSecondsResting,
  postData,
  putData,
  deleteData,
}) {
  return (
    <form onSubmit={setID ? putData : postData}>
      <SimpleGrid columns={7} columnGap={3} rowGap={3} w="full">
        <GridItem>
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
        <GridItem mt="auto">
          <FormControl>
            <Button
              type="submit"
              w="full"
              colorScheme="brand"
              isLoading={loading}
              spinnerPlacement="end"
            >
              {setID ? <EditIcon /> : <CheckIcon />}
            </Button>
          </FormControl>
        </GridItem>
        <GridItem mt="auto">
          <FormControl>
            <Button
              onClick={deleteData}
              w="full"
              colorScheme="brand"
              variant="outline"
              isLoading={loading}
              spinnerPlacement="end"
            >
              <DeleteIcon />
            </Button>
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </form>
  );
}

export default DesktopSetForm;
