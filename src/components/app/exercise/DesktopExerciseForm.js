import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DeleteButtonWithWarning from "../../../utils/DeleteButtonWithWarning";

function DesktopExerciseForm({
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
      <SimpleGrid columns={9} columnGap={3} rowGap={3} w="full">
        <GridItem colSpan={2}>
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
        <GridItem colSpan={1}>
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
        <GridItem colSpan={2}>
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
        <GridItem mt="auto">
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
              {exerciseID ? <EditIcon /> : <CheckIcon />}
            </Button>
          </FormControl>
        </GridItem>
        <GridItem mt="auto">
          <FormControl>
            {exerciseID ? (
              <DeleteButtonWithWarning
                deleteText="Delete Exercise"
                isDisabled={false}
                deleteFunction={deleteData}
              />
            ) : (
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
            )}
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </form>
  );
}

export default DesktopExerciseForm;
