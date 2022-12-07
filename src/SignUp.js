import React from "react";
import {
  SimpleForm,
  PasswordInput,
  TextInput,
  Toolbar,
  Create,
  SaveButton,
  useNotify,
  Notification
} from "react-admin";
import { UserPoolId, ClientId } from "./config.js";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import { useForm } from "react-final-form";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";

const CreateUserAction = ({ invalid, handleSubmitWithRedirect, ...rest }) => {
  const form = useForm();
  const notify = useNotify();
  const history = useHistory();
  const onSave = () => {
    form.change("username", form.getState()?.values?.email);
    const UserPool = new CognitoUserPool({ UserPoolId, ClientId });
    const { email, password } = form.getState()?.values;
    const attributeEmail = new CognitoUserAttribute({
      Name: "email",
      Value: email
    });
    UserPool.signUp(email, password, [attributeEmail], null, function(
      err,
      result
    ) {
      if (err) {
        console.log(err);
        notify("ra.message.invalid_form", "error", [], false, 1000);
        return;
      }
      var cognitoUser = result.user;
      history.push(`/checkemail?email=${cognitoUser.getUsername()}`);
    });
  };
  return (
    <Toolbar>
      <SaveButton
        label={"sign up"}
        {...rest}
        icon={<PersonAddIcon />}
        disabled={invalid}
        handleSubmitWithRedirect={onSave}
      />
    </Toolbar>
  );
};
const ButtonSignIn = () => {
  const history = useHistory();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => history.push("/login")}
    >
      Sign In
    </Button>
  );
};

export default () => (
  <Grid
    container
    item
    spacing={0}
    alignItems="center"
    justify="center"
    style={{ minHeight: "100vh" }}
  >
    <div
      style={{
        position: "absolute",
        top: "1em",
        right: "1em",
        color: "#fff"
      }}
    >
      <ButtonSignIn />
    </div>

    <Create basePath="/" resource="user">
      <SimpleForm toolbar={<CreateUserAction />}>
        <TextInput source="email" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Create>
    <Notification />
  </Grid>
);
