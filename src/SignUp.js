import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import MailIcon from "@mui/icons-material/Mail";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useHistory } from "react-router-dom";
import signup from "./img/signup.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import Divider from "@mui/material/Divider";

// validate form
const formValidationSchema = yup.object({
// validate name
  name: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
    .max(40)
    .required("Name is Required"),
  // validate email
    email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  // validate password
    password: yup
    .string()
    .min(8, "Password must be 8 Character")
    .max(12, "Too Much Password")
    .required("Password is required"),
  // validate confirm password 
    passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is Requred"),
});

// signup
export function SignUp() {
  const history = useHistory();
// formik
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        Register(values).then(() => history.push("/signin"));
        console.log("onSubmit", values);
      },
    });


  // const URL = `http://localhost:8000`;

  const URL = `https://password-change-api.herokuapp.com`;
  const Register = async (values) => {
    await fetch(`${URL}/signup`, {
      method: "POST",
      mode:'no-cors',
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  };
  return (
    <div className="form-container">
      <div className="signin-signup">
        <form className="login-form-container" onSubmit={handleSubmit}>
          <header className="login-header">Sign Up</header>
          <Box
            className="input-field"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name && touched.name}
              type="text"
              label="Name"
              variant="standard"
            />
          </Box>
          {errors.name && touched.name && errors.name}
          <Box
            className="input-field"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <MailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
              type="email"
              label="Email"
              variant="standard"
            />
          </Box>
          {errors.email && touched.email && errors.email}
          <Box
            className="input-field"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="password"
              name="password"
              value={values.password}
              error={errors.password && touched.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              label="Password"
              variant="standard"
            />
          </Box>
          {errors.password && touched.password && errors.password}
          <Box
            className="input-field"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              value={values.passwordConfirmation}
              error={
                errors.passwordConfirmation && touched.passwordConfirmation
              }
              onChange={handleChange}
              onBlur={handleBlur}
              label="Confirm Password"
              variant="standard"
            />
          </Box>
          {errors.passwordConfirmation &&
            touched.passwordConfirmation &&
            errors.passwordConfirmation}
          <Button
            type="submit"
            value="signin"
            className="btn"
            variant="contained"
          >
            <PersonAddAltIcon /> Sign Up
          </Button>
          <Divider />
          <p className="social-text">
            ---Or Sign in with Email or Social platforms---
          </p>
          <Button
            type="submit"
            value="signin"
            className="btn"
            variant="contained"
            onClick={() => history.push("/signin")}
          >
            <LoginIcon /> Sign in
          </Button>
        </form>
        <div className="img-container">
          <img src={signup} className="img" alt="img" />
        </div>
      </div>
    </div>
  );
}
