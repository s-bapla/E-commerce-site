import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import LoginForm from '../components/login/LoginForm';

const Login = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ marginTop: '100px' }}>
        <LoginForm />
      </Box>
    </>
  );
};

export default Login;
