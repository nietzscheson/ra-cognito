import React from "react";
import { Route } from "react-router-dom";
import SignUp from "./SignUp";
import CheckEmail from "./CheckEmail";

export default [
  <Route exact path="/signup" render={() => <SignUp />} noLayout />,
  <Route exact path="/checkemail" render={() => <CheckEmail />} noLayout />
];
