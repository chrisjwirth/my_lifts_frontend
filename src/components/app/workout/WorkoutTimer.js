import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useBreakpointValue,
} from "@chakra-ui/react";

function WorkoutTimer() {
  const timerSize = useBreakpointValue({ base: "full", md: "25%" });
  const [targetTime, setTargetTime] = useState(Date.now());
  const [millisecondsRemaining, setMillisecondsRemaining] = useState(0);
  const [timerPaused, setTimerPaused] = useState(true);

  const getSecondsRemaining = () => {
    return Math.ceil(millisecondsRemaining / 1000);
  };

  const updateMillisecondsRemaining = (changeInSeconds) => {
    const changeInMilliseconds = changeInSeconds * 1000;
    if (changeInSeconds === 60) {
      setMillisecondsRemaining(changeInMilliseconds);
    } else if (millisecondsRemaining + changeInSeconds > 0) {
      setMillisecondsRemaining(millisecondsRemaining + changeInMilliseconds);
    } else {
      setMillisecondsRemaining(0);
    }
    setTargetTime(Date.now() + millisecondsRemaining + changeInMilliseconds);
  };

  const toggleTimer = () => {
    setTargetTime(Date.now() + millisecondsRemaining);
    setTimerPaused(!timerPaused);
  };

  useEffect(() => {
    let interval = null;
    if (!timerPaused && getSecondsRemaining() > 0) {
      interval = setInterval(() => {
        setMillisecondsRemaining(targetTime - Date.now());
      }, 1000);
    } else if (!timerPaused && getSecondsRemaining() <= 0) {
      setTimerPaused(true);
      setMillisecondsRemaining(0);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [millisecondsRemaining, timerPaused]);

  return (
    <Flex justify="center">
      <Popover>
        <PopoverTrigger>
          <Button w={timerSize}>
            {getSecondsRemaining() > 0 ? getSecondsRemaining() : "Timer"}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Workout Timer (in Seconds)</PopoverHeader>
          <PopoverBody>
            <Flex direction="column" gap={5}>
              <Flex justify="space-around">
                <Button
                  onClick={() => updateMillisecondsRemaining(-30)}
                  disabled={getSecondsRemaining() < 30}
                >
                  - 30
                </Button>
                <Button onClick={() => updateMillisecondsRemaining(60)}>
                  60
                </Button>
                <Button onClick={() => updateMillisecondsRemaining(30)}>
                  + 30
                </Button>
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
