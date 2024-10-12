import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import SignUpForm from '../components/SignUp/SignUpForm';

const SignUp = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ marginTop: '100px' }}>
        <SignUpForm />
      </Box>
    </>
  );
};

export default SignUp;
