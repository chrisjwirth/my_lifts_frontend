import React, { useState } from "react";
import { Divider, Heading, Show, useToast } from "@chakra-ui/react";
import DesktopSetForm from "./DesktopSetForm";
import MobileSetForm from "./MobileSetForm";

function CreateUpdateDeleteSet({
  setNum,
  workoutID,
  exerciseID,
  setToEdit,
  deleteSet,
}) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const toast = useToast();

  const [setID, setSetID] = useState(setToEdit?.id ?? "");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [setNumber, setSetNumber] = useState(
    setToEdit?.set_number ?? setNum + 1
  );
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
    if (setID) {
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
    }
    deleteSet(setNum);
  };

  return (
    <>
      {errors === true && <Heading size="xl">Error Creating Set</Heading>}
      {exerciseID && (
        <>
          <Show above="md">
            <DesktopSetForm
              loading={loading}
              setID={setID}
              setNumber={setNumber}
              setSetNumber={setSetNumber}
              weight={weight}
              setWeight={setWeight}
              reps={reps}
              setReps={setReps}
              secondsWorking={secondsWorking}
              setSecondsWorking={setSecondsWorking}
              secondsResting={secondsResting}
              setSecondsResting={setSecondsResting}
              postData={postData}
              putData={putData}
              deleteData={deleteData}
            />
          </Show>
          <Show below="md">
            <MobileSetForm
              loading={loading}
              setID={setID}
              setNumber={setNumber}
              setSetNumber={setSetNumber}
              weight={weight}
              setWeight={setWeight}
              reps={reps}
              setReps={setReps}
              secondsWorking={secondsWorking}
              setSecondsWorking={setSecondsWorking}
              secondsResting={secondsResting}
              setSecondsResting={setSecondsResting}
              postData={postData}
              putData={putData}
              deleteData={deleteData}
            />
          </Show>
          <Divider />
        </>
      )}
    </>
  );
}

export default CreateUpdateDeleteSet;
