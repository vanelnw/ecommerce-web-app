import { Send } from "@mui/icons-material";
import { alpha, InputBase, styled, Typography } from "@mui/material";

const Newsletter = () => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        NEWSLETTER
      </Typography>
      <Typography component="h2" variant="h6">
        Always in touch with us, for your favourite Products.
      </Typography>
      <Search>
        <StyledInputBase type="email" placeholder="Email" />
        <SearchIconWrapper>
          <Send />
        </SearchIconWrapper>
      </Search>
    </Container>
  );
};

export default Newsletter;

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "350px",
  backgroundColor: "#003580",
  color: "white",
  overflow: "hidden",
  gap: "20px",
}));

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  backgroundColor: "#0071c2",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
