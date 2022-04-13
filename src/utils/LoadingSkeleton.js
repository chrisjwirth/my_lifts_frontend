import React from "react";
import { Divider, Skeleton, Stack } from "@chakra-ui/react";

function LoadingSkeleton() {
  return (
    <Stack w="full" h="full" spacing={4}>
      <Skeleton height="40px" />
      <Skeleton height="80px" />
      <Skeleton height="80px" />
      <Divider />
      <Skeleton height="40px" />
      <Skeleton height="80px" />
      <Skeleton height="80px" />
    </Stack>
  );
}

export default LoadingSkeleton;
