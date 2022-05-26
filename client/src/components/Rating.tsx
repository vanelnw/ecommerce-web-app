import { Rating, styled } from "@mui/material";
import React from "react";

interface Props {
  rating: number;
  text?: string;
  onClick?: (i: number) => void;
  style?: any;
}

const Ratings: React.FC<Props> = ({ rating, text, onClick, style }) => {
  return (
    <Container>
      <Rating
        sx={{ fontSize: "12px" }}
        value={rating}
        readOnly
        onChange={(event, newValue) => {
          console.log(newValue);
        }}
      />
      <span style={{ fontSize: "12px" }}>{text && text}</span>
    </Container>
  );
};

export default Ratings;

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "5px",
}));
