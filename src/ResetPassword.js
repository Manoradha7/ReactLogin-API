import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import resetpassword from "./img/resetpassword.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory,useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const formValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be 8 Character")
    .max(12, "Too Much Password")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export function ResetPassword() {

  const {id}= useParams();

  //snack bar
  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const history = useHistory();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { password: "", passwordConfirmation: "",token: id },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        Changepassword(values)
        console.log("onSumit", values);
      },
    });

    const URL = `https://password-change-api.herokuapp.com`;
    const Changepassword= async(values)=>{
     await fetch(`${URL}/users/resetpassword`,
     {
       method:"POST",
       body  :JSON.stringify(values),
       headers:{"Content-Type":"application/json"}
     }).then((response) => {
      if (response.status === 200) {
        setMsg({
          Message: "Password Changed Successfully",
          status: "success",
        });
        setOpen(true);
        setTimeout(() => history.push("/"), 3000);
      }
    });
     
   }
  return (
    <div className="form-container">
      <div className="signin-signup">
        <form className="fb-form-container" onSubmit={handleSubmit}>
          <header className="reset-header">Reset Your Password</header>
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
            {errors.password && touched.password && errors.password}
          </Box>
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
            {errors.passwordConfirmation &&
              touched.passwordConfirmation &&
              errors.passwordConfirmation}
          </Box>
          <Button
            type="submit"
            value="signin"
            className="btn"
            variant="contained"
          >
            <LoginIcon />
            Submit
          </Button>
        </form>
        <div className="img-container">
          <img src={resetpassword} className="img" alt="img" />
        </div>
      </div>
      <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={Msg.status}
            sx={{ width: "100%" }}
          >
            {Msg.Message}
          </Alert>
        </Snackbar>
    </div>
  );
}
