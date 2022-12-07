import React from "react";
import "./styles.css";
import { Admin, Resource, ListGuesser, Login } from "react-admin";
import { createBrowserHistory } from "history";
import simpleRestProvider from "ra-data-json-server";
import AuthProvider from "./ra-cognito";
import { useHistory } from "react-router-dom";
import { UserPoolId, ClientId } from "./config";
import PostIcon from "@material-ui/icons/Book";
import CustomRoutes from "./CustomRoutes";
import { Button } from "@material-ui/core";

export default function App() {
  const ButtonSignUp = () => {
    const history = useHistory();
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/signup")}
      >
        Sign Up
      </Button>
    );
  };
  const CustomLogin = () => (
    <>
      <Login />
      <div
        style={{
          position: "absolute",
          top: "1em",
          right: "1em",
          color: "#fff"
        }}
      >
        <ButtonSignUp />
      </div>
    </>
  );
  const createHistory = () => {
    const history = window.browserHistory || createBrowserHistory();
    if (process.env.NODE_ENV === "development" && !window.browserHistory) {
      window.browserHistory = history;
    }
    return history;
  };
  const history = createHistory();
  return (
    <Admin
      dataProvider={simpleRestProvider("https://jsonplaceholder.typicode.com")}
      history={history}
      authProvider={AuthProvider({ UserPoolId, ClientId })}
      loginPage={CustomLogin}
      customRoutes={CustomRoutes}
    >
      <Resource name="todos" list={ListGuesser} icon={PostIcon} />
      <Resource name="posts" list={ListGuesser} icon={PostIcon} />
    </Admin>
  );
}
