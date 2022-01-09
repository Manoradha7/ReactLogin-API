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
  // const URL = `http://localhost:8000`;
  const URL = `https://testnode123432.herokuapp.com`;
  const forgot= (values)=>{
    fetch(`${URL}/forgetpassword`,
    {
      mode:'no-cors',
      method:"POST",
      body:JSON.stringify(values),
      headers:{'Content-Type':'application/json'}
    }).then(()=>history.push('/reset-password'))
  
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
    </div>
  );
}
