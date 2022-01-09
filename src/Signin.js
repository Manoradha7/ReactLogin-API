// importing packages
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import MailIcon from "@mui/icons-material/Mail";
import LoginIcon from "@mui/icons-material/Login";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Link } from "@mui/material";
import signin from "./img/signin.svg";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Divider from "@mui/material/Divider";

// form validation using yup
const formValidationSchema = yup.object({

  //validate email field
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    //.matches(!/^[A-Z0-9._%+-]+@[A-Z0-9+=]+\.[A-Z]{2,}$/i, "Pattern not matched")
    .required("Email is required"),

    // validte password field
    password: yup
    .string()
    .min(8, "Password must be 8 character")
    .max(12, "Too much Password")
    .required("Password is required"),
});

// signin component
export function Signin() {
  const history = useHistory();
// use formik for the form process
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      // give initial value as empty
      initialValues: { email: "", password: "" },
    //  validation
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        Login(values).then(()=>history.push("/dashboard"))
        console.log("values", values);
      },
    });

    // const URL = `http://localhost:8000`;

    const URL = `https://password-change-api.herokuapp.com`;
  const Login = async (values) => {
    await fetch(`${URL}/signin`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <div className="form-container">
      <div className="signin-signup">
        <form className="login-form-container" onSubmit={handleSubmit}>
          <header className="login-header">Sign in</header>
          <Box
            className="input-field"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <MailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.email && touched.email}
              type="email"
              label="E-mail"
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
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password}
              type="password"
              label="Password"
              variant="standard"
            />
          </Box>
          {errors.password && touched.password & errors.password}
          <Button
            type="submit"
            value="signin"
            className="btn"
            variant="contained"
          >
            <LoginIcon /> Sign in
          </Button>
          <Link onClick={() => history.push("/forgetpassword")}>
            Forget password?
          </Link>
          <Divider />
          <p className="social-text">---Or Sign in with Social platforms---</p>
          <div className="social-media">
            <Button
              type="submit"
              value="signin"
              className="btn"
              variant="contained"
            >
              <FacebookOutlinedIcon /> Sign in with Facebook
            </Button>
            <Button
              type="submit"
              value="signin"
              className="btn"
              variant="contained"
            >
              <GoogleIcon /> Sign in with Google
            </Button>
            <Button
              type="submit"
              value="signin"
              className="btn"
              onClick={() => history.push("/signup")}
              variant="contained"
            >
              <PersonAddAltIcon /> Sign up
            </Button>
          </div>
        </form>
        <div className="img-container">
          <img src={signin} className="img" alt="img" />
        </div>
      </div>
    </div>
  );
}
