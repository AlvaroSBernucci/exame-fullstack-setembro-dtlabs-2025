import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faUser } from "@fortawesome/free-solid-svg-icons";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import {
  styledBrand,
  styledBtnLogin,
  styledHeader,
  styledIcon,
} from "./HeaderStyled.tsx";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserContext";

function Header() {
  const { login, userLogout } = useContext(UserContext);

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
          {login ? (
            <Button
              startIcon={<FontAwesomeIcon icon={faUser} />}
              sx={styledBtnLogin}
              onClick={userLogout}
            >
              Sair
            </Button>
          ) : (
            <Button
              startIcon={<FontAwesomeIcon icon={faUser} />}
              sx={styledBtnLogin}
            >
              Entrar
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
