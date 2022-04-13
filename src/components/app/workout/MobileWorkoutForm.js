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
import DeleteButtonWithWarning from "../../../utils/DeleteButtonWithWarning";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";

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
      <SimpleGrid columns={5} columnGap={3} rowGap={5} w="full">
        <GridItem colSpan={5}>
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
        <GridItem colSpan={3}>
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
                <GridItem py={1}>
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
                <GridItem py={1}>
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
                <GridItem py={1}>
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
            <Button
              type="submit"
              w="full"
              colorScheme="brand"
              isLoading={loading}
              spinnerPlacement="end"
            >
              {workoutID ? <EditIcon /> : <CheckIcon />}
            </Button>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <DeleteButtonWithWarning
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

export default MobileWorkoutForm;
