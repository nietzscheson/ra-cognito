import React from "react";
import { useNotify, Notification } from "react-admin";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { UserPoolId, ClientId } from "./config.js";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";

export default () => {
  const notify = useNotify();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const onClick = () => {
    const UserPool = new CognitoUserPool({
      UserPoolId,
      ClientId
    });
    const userData = {
      Username: query.get("email"),
      Pool: UserPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        notify(err.message, "error", [], false, 1000);
        return;
      }
      notify("the confirmation email has been successfully sent.");
      console.log("call result: ", result);
    });
  };

  return (
    <div>
      <div>
        <h1>Check your inbox to verify your email</h1>
      </div>
      <div />
      <div>
        <Button variant="contained" color="primary" onClick={onClick}>
          Resend
        </Button>
      </div>
      <Link to={"/login"}>back to the login</Link>
      <Notification />
    </div>
  );
};
