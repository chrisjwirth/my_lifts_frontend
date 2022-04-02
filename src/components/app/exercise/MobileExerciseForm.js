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
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

function MobileExerciseForm({
  loading,
  exerciseID,
  name,
  setName,
  variation,
  setVariation,
  description,
  setDescription,
  notes,
  setNotes,
  postData,
  putData,
  deleteData,
}) {
  return (
    <form onSubmit={exerciseID ? putData : postData}>
      <SimpleGrid columns={5} columnGap={3} rowGap={5} w="full">
        <GridItem colSpan={5}>
          <FormControl>
            <FormLabel htmlFor="name">Exercise Name</FormLabel>
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
                    <FormLabel htmlFor="variation">Variation</FormLabel>
                    <Input
                      id="variation"
                      name="variation"
                      type="text"
                      value={variation}
                      onChange={(e) => setVariation(e.target.value)}
                    />
                  </FormControl>
                </GridItem>
                <GridItem py={1}>
                  <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                      id="description"
                      name="description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
              {exerciseID ? <EditIcon /> : <CheckIcon />}
            </Button>
          </FormControl>
        </GridItem>
        <GridItem>
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

export default MobileExerciseForm;
