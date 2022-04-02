import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import DeleteButtonWithWarning from "./DeleteButtonWithWarning";

function MobileWorkoutForm({
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
      <SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
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
        <GridItem colSpan={2} py={2}>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    More
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
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
                <GridItem colSpan={2}>
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
                <GridItem colSpan={2}>
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
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
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
  );
}

export default MobileWorkoutForm;
