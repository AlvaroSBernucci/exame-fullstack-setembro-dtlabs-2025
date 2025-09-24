import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { UserContext } from '../../context/UserContext/UserContext';
import { styledBrand, styledHeader, styledIcon } from './HeaderStyled.tsx';
import { useContext } from 'react';
import HeaderMenu from '../Menu/Menu.tsx';

function Header() {
  const { login } = useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styledHeader}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to={login ? '/home' : '/'}>
              <FontAwesomeIcon icon={faShield} style={styledIcon} />
              <Typography component="span" sx={styledBrand}>
                IoTGuard
              </Typography>
            </Link>
          </Box>
          <HeaderMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
