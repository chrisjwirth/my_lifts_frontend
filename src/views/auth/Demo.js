import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

function Demo({ setLoggedIn, setDemoInProgress }) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const DEMO_PASSWORD = process.env.REACT_APP_DEMO_PASSWORD;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      email: "demo@mylifts.app",
      password: DEMO_PASSWORD,
    };

    fetch(`${BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          setLoggedIn(true);
          setDemoInProgress(true);
          navigate("/all-workouts");
        } else {
          localStorage.clear();
          setLoggedIn(false);
          setDemoInProgress(false);
        }
      });
  };

  return (
    <Button
      onClick={onSubmit}
      rightIcon={<UnlockIcon />}
      colorScheme="brand"
      variant="outline"
      isLoading={loading}
    >
      Demo
    </Button>
  );
}

export default Demo;
