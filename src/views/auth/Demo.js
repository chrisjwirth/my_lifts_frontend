import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

function Demo({ setLoggedIn }) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const DEMO_PASSWORD = process.env.REACT_APP_DEMO_PASSWORD;
  const navigate = useNavigate();

  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/all-workouts");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

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
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          setLoggedIn(true);
          navigate("/all-workouts");
        } else {
          localStorage.clear();
          setLoggedIn(false);
          setErrors(true);
        }
      });
  };

  return (
    <Button
      onClick={onSubmit}
      rightIcon={<UnlockIcon />}
      colorScheme="brand"
      variant="outline"
    >
      Demo
    </Button>
  );
}

export default Demo;
