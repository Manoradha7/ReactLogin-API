// importing packages
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MailIcon from "@mui/icons-material/Mail";
import LoginIcon from "@mui/icons-material/Login";
import forgetpassword from "./img/forgetpassword.svg";
import {useFormik} from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// validate form using yup
const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});
// forgetpassword
export function ForgetPassword() {

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
  // 
  const {handleSubmit,handleChange,handleBlur,values,errors,touched}=useFormik({
    initialValues : {email:""},
    validationSchema: formValidationSchema,
      onSubmit: (values) => {
        forgot(values)
        console.log("onSubmit", values);
      },
  })
  
  const URL = `https://password-change-api.herokuapp.com`;
  const forgot= (values)=>{
    fetch(`${URL}/users/forgetpassword`,
    {
      method:"POST",
      body:JSON.stringify(values),
      headers:{'Content-Type':'application/json'}
    }).then((response) => {
      if (response.status === 200) {
        setMsg({
          Message: "Verification link sent to the registered mail",
          status: "success",
        });
      } else {
        setMsg({ Message: "Mail is not registered", status: "error" });
      }
      setOpen(true);
    });
  
  }
  return (
    <div className="form-container">
      <div className="signin-signup">
        <form className="fb-form-container" onSubmit={handleSubmit}>
          <header className="login-header">Forget Password</header>
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
          <Button
            type="submit"
            value="signin"
            className="btn"
            variant="contained"
          >
            <LoginIcon />Submit
          </Button>
        </form>
        <div className="img-container">
          <img
            src={forgetpassword}
            className="img"
            alt="img" />
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
