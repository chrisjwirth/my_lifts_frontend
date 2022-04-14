import React, { useEffect, useState } from "react";
import { Global, css } from "@emotion/react";
// noinspection ES6CheckImport
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Container, Flex, Spacer } from "@chakra-ui/react";
import Home from "./views/app/Home";
import AllWorkouts from "./views/app/AllWorkouts";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LogIn from "./views/auth/LogIn";
import SignUp from "./views/auth/SignUp";
import LogOut from "./views/auth/LogOut";
import Workout from "./views/app/Workout";
import Templates from "./views/app/Templates";

import theme from "./theme";
import "./theme/styles.css";
import ResetPasswordRequest from "./views/auth/ResetPasswordRequest";
import ResetPassword from "./views/auth/ResetPassword";
import SignUpVerification from "./views/auth/SignUpVerification";

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [demoInProgress, setDemoInProgress] = useState(false);
  const [workoutToEdit, setWorkoutToEdit] = useState();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <Router>
        <Container maxW="container.xl" p={0}>
          <Flex h="100vh" py={4} direction="Column">
            <Header isLoggedIn={isLoggedIn} demoInProgress={demoInProgress} />
            <Spacer />
            <main>
              <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/sign-up-verification/:key"
                  element={<SignUpVerification />}
                />
                <Route
                  path="/log-in"
                  element={<LogIn setLoggedIn={setLoggedIn} />}
                />
                <Route
                  path="/reset-password-request"
                  element={<ResetPasswordRequest />}
                />
                <Route
                  path="/reset-password/:uid/:token"
                  element={<ResetPassword />}
                />
                <Route
                  path="/log-out"
                  element={
                    <LogOut
                      setLoggedIn={setLoggedIn}
                      demoInProgress={demoInProgress}
                      setDemoInProgress={setDemoInProgress}
                    />
                  }
                />
                <Route path="/templates" element={<Templates />} />
                <Route
                  path="/all-workouts"
                  element={<AllWorkouts setWorkoutToEdit={setWorkoutToEdit} />}
                />
                <Route
                  path="/workout"
                  element={<Workout workoutToEdit={workoutToEdit} />}
                />
                <Route
                  path="/"
                  element={
                    <Home
                      isLoggedIn={isLoggedIn}
                      setLoggedIn={setLoggedIn}
                      demoInProgress={demoInProgress}
                      setDemoInProgress={setDemoInProgress}
                    />
                  }
                />
              </Routes>
            </main>
            <Spacer />
            <Footer />
          </Flex>
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;
