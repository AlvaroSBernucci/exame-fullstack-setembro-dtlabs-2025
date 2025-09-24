import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import { Link } from 'react-router-dom';
import { styledBtnLogin } from '../Header/HeaderStyled';

export default function HeaderMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { login, userLogout } = useContext(UserContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    userLogout();
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={login ? handleClick : undefined}
        sx={styledBtnLogin}
      >
        {login ? 'Menu' : 'Entrar'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {login ? (
          <div>
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <MenuItem onClick={handleClose} sx={styledBtnLogin}>
                Home
              </MenuItem>
            </Link>
            <Link to="/devices" style={{ textDecoration: 'none' }}>
              <MenuItem onClick={handleClose} sx={styledBtnLogin}>
                Dispositivos (config)
              </MenuItem>
            </Link>
            <Link to="/device-data" style={{ textDecoration: 'none' }}>
              <MenuItem onClick={handleClose} sx={styledBtnLogin}>
                Dados dos dispositivos
              </MenuItem>
            </Link>
            <Link to="/notifications" style={{ textDecoration: 'none' }}>
              <MenuItem onClick={handleClose} sx={styledBtnLogin}>
                Notificações
              </MenuItem>
            </Link>

            <MenuItem onClick={handleLogout} sx={styledBtnLogin}>
              Logout
            </MenuItem>
          </div>
        ) : (
          <MenuItem sx={styledBtnLogin} onClick={userLogout}>
            Entrar
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
