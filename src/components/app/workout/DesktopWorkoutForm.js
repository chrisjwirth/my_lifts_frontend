import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import DeleteButtonWithWarning from "./DeleteButtonWithWarning";

function DesktopWorkoutForm({
  loading,
  workoutID,
  name,
  setName,
  date,
  setDate,
  location,
  setLocation,
  notes,
  setNotes,
  postData,
  putData,
  deleteData,
}) {
  return (
    <form onSubmit={workoutID ? putData : postData}>
      <SimpleGrid columns={10} columnGap={3} rowGap={3} w="full">
        <GridItem colSpan={2}>
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
        <GridItem colSpan={2}>
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
        <GridItem colSpan={1}>
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
        <GridItem colSpan={3}>
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
              deleteText="Delete Workout"
              isDisabled={!workoutID}
              deleteFunction={deleteData}
            />
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </form>
  );
}

export default DesktopWorkoutForm;
