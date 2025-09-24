import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { Formik, Field } from 'formik';
import { ToastContainer } from 'react-toastify';
import { StyledForm } from './LoginPage.styled';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import LoginIcon from '@mui/icons-material/Login';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string().required('Usuário obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

export default function LoginPage() {
  const { userLogin } = useContext(UserContext);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={userLogin}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <Grid>
              <ShieldOutlinedIcon
                style={{ width: '3rem', height: '3rem', color: '#3c83f6' }}
              />

              <Typography
                component="h1"
                style={{ color: '#3c83f6', fontSize: '1.875rem' }}
              >
                IoTGuard
              </Typography>
              <Typography style={{ color: '#878d94ff', fontSize: '1rem' }}>
                Sistema de Gerenciamento IoT
              </Typography>
            </Grid>
            <Typography
              component="h3"
              style={{
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5rem',
                textAlign: 'center',
              }}
            >
              <LoginIcon />
              Fazer Login
            </Typography>
            <Typography style={{ color: '#878d94ff', fontSize: '.875rem' }}>
              Digite suas credenciais para acessar o sistema
            </Typography>
            <Field
              as={TextField}
              name="username"
              label="Usuário"
              fullWidth
              error={!!errors.username && touched.username}
              helperText={touched.username && errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Field
              as={TextField}
              name="password"
              label="Senha"
              type="password"
              fullWidth
              error={!!errors.password && touched.password}
              helperText={touched.password && errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" color="primary">
              Entrar
            </Button>
          </StyledForm>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={3000} />
    </Grid>
  );
}
