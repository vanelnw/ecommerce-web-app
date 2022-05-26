import { Paper, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import covid from "../../img/new-file/Covid-offer-chitwashop.jpg";

const CovidOffer = () => {
  return (
    <Container>
      <Link to="/">
        <img
          src={covid}
          alt="covid"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </Link>
    </Container>
  );
};

export default CovidOffer;

const Container = styled(Paper)(({ theme }) => ({
  display: "flex",
  flex: 1,
  margin: "3px",
  padding: "2px",
}));
