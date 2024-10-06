import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Landing from "./templates/Landing"
import Login from "./templates/Login"
import SignUp from "./templates/SignUp"
import Homepage from "./templates/Homepage"
import Report from "./templates/Report"
import Settings from "./templates/Settings"
import Profile from "./templates/Profile"
import TermsOfUse from "./templates/TermsOfUse"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/report" element={<Report />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
      </Routes>
    </Router>
  )
}

export default App
