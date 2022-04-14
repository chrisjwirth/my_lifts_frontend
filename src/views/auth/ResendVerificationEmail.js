import React from "react";
import { Link, useToast } from "@chakra-ui/react";

function ResendVerificationEmail({ email }) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const toast = useToast();

  const onClick = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required.",
        description: "Please enter your email address and try again",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      fetch(`${BASE_URL}/auth/registration/resend-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.detail === "ok") {
            toast({
              title: "Success.",
              description: "Verification email resent",
              position: "top",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Error.",
              description: "Please try again",
              position: "top",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        });
    }
  };

  return <Link onClick={onClick}>Resend Verification Email</Link>;
}

export default ResendVerificationEmail;
