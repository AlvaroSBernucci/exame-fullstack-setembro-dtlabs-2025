import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styledBrand, styledHeader, styledIcon } from './HeaderStyled.tsx';
import HeaderMenu from '../Menu/Menu.tsx';

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styledHeader}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
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
