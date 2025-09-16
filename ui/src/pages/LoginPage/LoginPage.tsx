import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Formik, Field } from "formik";
import { ToastContainer } from "react-toastify";
import { StyledForm } from "./LoginPage.styled";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserContext";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Usuário obrigatório"),
  password: Yup.string().required("Senha obrigatória"),
});

export default function LoginPage() {
  const { userLogin } = useContext(UserContext);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={userLogin}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <Typography component="p">Tela de Login</Typography>
            <Field
              as={TextField}
              name="username"
              label="Usuário"
              fullWidth
              error={!!errors.username && touched.username}
              helperText={touched.username && errors.username}
            />

            <Field
              as={TextField}
              name="password"
              label="Senha"
              type="password"
              fullWidth
              error={!!errors.password && touched.password}
              helperText={touched.password && errors.password}
            />

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </StyledForm>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={3000} />
    </Grid>
  );
}
