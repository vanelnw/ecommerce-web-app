import React from "react";
import { AppBar, Badge, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configueStore";
import { querySearch } from "../store/filter";
import { alpha, styled } from "@mui/material";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.entities.cart);

  return (
    <div>
      <AppBar position="static">
        <Main>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h4">
            <Link to="/"> Yaba Shop</Link>
          </Typography>

          <Search>
            <Icon>
              <SearchIcon />
            </Icon>
            <Input
              placeholder="Search…"
              onChange={(e) => {
                dispatch(querySearch(e.target.value));
              }}
            />
          </Search>
          <Link to="/cart">
            <Badge badgeContent={cart?.cartItems?.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Link>
          <Link to="/login">
            <Typography>Login</Typography>
          </Link>
        </Main>
      </AppBar>
    </div>
  );
};

export default Header;

const Main = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  height: "50px",
}));

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  height: "70%",

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const Icon = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Input = styled("input")(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create("width"),
  width: "300px",
  [theme.breakpoints.up("md")]: {
    width: "50ch",
  },
  color: "inherit",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
}));
