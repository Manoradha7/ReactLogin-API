// importing packages 
import "./App.css";
import { Signin } from "./Signin";
import { SignUp } from "./SignUp";
import { ResetPassword } from "./ResetPassword";
import { ForgetPassword } from "./ForgetPassword.js";
import { Route, Switch, Redirect } from "react-router-dom";
import * as React from "react";
import { Message } from "./Message";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory, useParams } from "react-router-dom";

// const URL=`https://616e488fa83a850017caa8e1.mockapi.io/users`;

export default function App() {
  return (
    <div className="container">
      
      {/* Routing */}
      <Switch>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route exact path="/reset-password">
          <Message />
        </Route>
        <Route path="/forgetpassword/verify/:id">
          <ChangeUrl />
        </Route>
        <Route exact path="/resetpassword/:id">
          <ResetPassword />
        </Route>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/Message">
          <SuccessMessage />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

// dahhboard
function Dashboard() {
  return <div className="dashboard">Dashboard Coming Soon...</div>;
}

// changing url
function ChangeUrl() {
  const { id } = useParams();
  // console.log(id);
  // By using useParams Hook, the token from the database is taken

  return id ? <Updatepassword id={id} /> : null;
}

// updatpassword
function Updatepassword({ id }) {
  const { history } = useHistory();
  console.log(id);
  const URL = `https://password-change-api.herokuapp.com`;
  const Result = (id) => {
    fetch(`${URL}/forgetpassword/verify`, {
      method: "GET",
      headers: { "x-auth-token": id },
    })
      .then((res) => res.status)
      .then((status) =>
        status === 200 ? ()=>history.push(`/resetpassword`) : null
      );
  };

  Result(id);

  // Loading Page
  return (
    <div className="loader-container">
      <div className="box-loader">
        <div className="rond first"></div>
        <div className="rond second"></div>
      </div>
    </div>
  );
}

// password changing success message
function SuccessMessage() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Message</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Password Successfully Changed!!!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
