import { Button, TextField, Box } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { useDispatch } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { setUser } from '../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleAddUser = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const user = { username, password };
    dispatch(setUser(user));
    navigate('/');
  };
  return (
    <form style={{ textAlign: 'center' }} onSubmit={handleAddUser}>
      <Box m={2}>
        <TextField
          label='Username'
          variant='outlined'
          required
          name='username'
          sx={{ width: '350px' }}
        />
      </Box>
      <Box m={2}>
        <FormControl sx={{ m: 2, width: '350px' }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>
            Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
            name='password'
          />
        </FormControl>
      </Box>
      <Button type='submit'>Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
