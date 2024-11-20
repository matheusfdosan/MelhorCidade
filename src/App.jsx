import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./utils/themeContext";

import Landing from "./templates/Landing";
import Login from "./templates/Login";
import SignUp from "./templates/SignUp";
import Homepage from "./templates/Homepage";
import Report from "./templates/Report";
import Settings from "./templates/Settings";
import Profile from "./templates/Profile";
import TermsOfUse from "./templates/TermsOfUse";
import Map from "./templates/Map";
import Dashboard from "./templates/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/homepage"
          element={
            <ThemeProvider>
              <Homepage />
            </ThemeProvider>
          }
        />
        <Route
          path="/report"
          element={
            <ThemeProvider>
              <Report />
            </ThemeProvider>
          }
        />
        <Route
          path="/settings"
          element={
            <ThemeProvider>
              <Settings />
            </ThemeProvider>
          }
        />
        <Route
          path="/account"
          element={
            <ThemeProvider>
              <Profile />
            </ThemeProvider>
          }
        />
        <Route
          path="/terms-of-use"
          element={
            <ThemeProvider>
              <TermsOfUse />
            </ThemeProvider>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ThemeProvider>
              <Dashboard />
            </ThemeProvider>
          }
        />
        <Route
          path="/map"
          element={
            <ThemeProvider>
              <Map />
            </ThemeProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
