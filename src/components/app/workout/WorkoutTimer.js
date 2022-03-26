import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

function WorkoutTimer() {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [timerPaused, setTimerPaused] = useState(true);

  const updateSecondsRemaining = change => {
    if (change === 60) {
      setSecondsRemaining(60);
    } else if (secondsRemaining + change > 0) {
      setSecondsRemaining(secondsRemaining + change);
    } else {
      setSecondsRemaining(0);
    }
  };

  const toggleTimer = () => {
    setTimerPaused(!timerPaused);
  };

  useEffect(() => {
    let interval = null;
    if (!timerPaused) {
      interval = setInterval(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    } else if (timerPaused && secondsRemaining !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [secondsRemaining, timerPaused]);

  return (
    <Flex justify="center">
      <Popover>
        <PopoverTrigger>
          <Button>{secondsRemaining !== 0 ? secondsRemaining : "Timer"}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Workout Timer (in Seconds)</PopoverHeader>
          <PopoverBody>
            <Flex direction="column" gap={5}>
              <Flex justify="space-around">
                <Button onClick={() => updateSecondsRemaining(-30)}>
                  - 30
                </Button>
                <Button onClick={() => updateSecondsRemaining(60)}>60</Button>
                <Button onClick={() => updateSecondsRemaining(30)}>+ 30</Button>
              </Flex>
              <Flex justify="center" gap={5}>
                <Button onClick={toggleTimer}>
                  {timerPaused ? "Start" : "Pause"}
                </Button>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}

export default WorkoutTimer;
