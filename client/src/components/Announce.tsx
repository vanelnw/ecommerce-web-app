import { Close } from "@mui/icons-material";
import { styled } from "@mui/material";
import React, { useState } from "react";

const Announce = () => {
  const [show, setShow] = useState(true);

  return (
    <StyledContainer className={!show ? "disable" : "d"}>
      <h2>Hurry up it's 40% ooff now</h2>
      <Close onClick={() => setShow(false)} />
    </StyledContainer>
  );
};

export default Announce;

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "10px",
  backgroundColor: "#8a4af3",

  "&.disable": {
    display: "none",
  },

  h2: {
    color: "yellow",
  },
}));
