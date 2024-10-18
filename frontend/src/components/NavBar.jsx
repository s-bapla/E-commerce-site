import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {
  // ...
  useNavigate,
} from 'react-router-dom';
import { styled } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { set_user } from '../reducers/userReducer';
// import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { setCart } from '../reducers/cartReducer';
import { set_orders, setOrders } from '../reducers/orderReducer';

const StyledButton = styled(Button)(() => ({
  my: 2,
  color: 'white',
  display: 'block',
  '&:hover': {
    background: blue[300],
  },
}));
const pages = ['Products', 'Cart', 'Admin Products', 'Add Products', 'Orders'];
const settings = ['Orders', 'Cart', 'Logout'];
const settingsLoggedOut = ['Sign Up', 'Log In'];
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const user = useSelector((state) => state.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    switch (setting) {
      case 'Sign Up':
        navigate('/signup');
        break;
      case 'Log In':
        navigate('/login');
        break;
      case 'Logout':
        dispatch(set_user(''));
        dispatch(setCart([]));
        dispatch(setOrders([]));
        window.localStorage.clear();
        navigate('/');
    }
  };

  const handleNavigate = (page) => {
    setAnchorElNav(null);
    switch (page) {
      case 'Products':
        navigate('/');
        break;
      case 'Add Products':
        navigate('/add-product');
        break;
      case 'Cart':
        navigate(`/cart/${user.id}`);
        break;
      case 'Admin Products':
        navigate('/admin');
        break;
      case 'Orders':
        dispatch(set_orders());
        navigate('/orders');
    }
  };

  return (
    <AppBar position='fixed'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => {
                if (
                  (page === 'Admin Products' || page === 'Add Products') &&
                  user?.role === 'admin'
                ) {
                  return (
                    <StyledButton
                      sx={{ color: 'black', width: '100%' }}
                      key={page}
                      onClick={() => handleNavigate(page)}
                    >
                      {page}
                    </StyledButton>
                  );
                }

                // Render 'Products' for all users
                if (page === 'Products') {
                  return (
                    <StyledButton
                      sx={{ color: 'black', width: '100%' }}
                      key={page}
                      onClick={() => handleNavigate(page)}
                    >
                      {page}
                    </StyledButton>
                  );
                }

                // Render 'Cart' only if the user is logged in
                if (page === 'Cart' && user) {
                  return (
                    <StyledButton
                      sx={{ color: 'black', width: '100%' }}
                      key={page}
                      onClick={() => handleNavigate(page)}
                    >
                      {page}
                    </StyledButton>
                  );
                }
                if (page === 'Orders' && user) {
                  return (
                    <StyledButton
                      key={page}
                      onClick={() => handleNavigate(page)}
                      sx={{ color: 'black', width: '100%' }}
                    >
                      {page}
                    </StyledButton>
                  );
                }
                return null;
              })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              if (
                (page === 'Admin Products' || page === 'Add Products') &&
                user?.role === 'admin'
              ) {
                return (
                  <StyledButton key={page} onClick={() => handleNavigate(page)}>
                    {page}
                  </StyledButton>
                );
              }

              // Render 'Products' for all users
              if (page === 'Products') {
                return (
                  <StyledButton key={page} onClick={() => handleNavigate(page)}>
                    {page}
                  </StyledButton>
                );
              }

              // Render 'Cart' only if the user is logged in
              if (page === 'Cart' && user) {
                return (
                  <StyledButton key={page} onClick={() => handleNavigate(page)}>
                    {page}
                  </StyledButton>
                );
              }
              if (page === 'Orders' && user) {
                return (
                  <StyledButton key={page} onClick={() => handleNavigate(page)}>
                    {page}
                  </StyledButton>
                );
              }
              return null;
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ fontSize: 40, color: 'white' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu('')}
            >
              {user
                ? settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography sx={{ textAlign: 'center' }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))
                : settingsLoggedOut.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography sx={{ textAlign: 'center' }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
