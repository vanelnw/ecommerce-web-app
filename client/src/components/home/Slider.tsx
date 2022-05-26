import {
  ArrowCircleRightOutlined,
  ArrowLeftOutlined,
  ArrowCircleLeftOutlined,
} from "@mui/icons-material";
import { Button, Paper, styled } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { slides } from "../../componentApi/SlidesApi";

const Slider = () => {
  let navigate = useNavigate();
  const [active, setActive] = useState(0);

  const prevSlide = () => {
    if (active === 0) {
      setActive(slides.length - 1);
    } else {
      setActive(active - 1);
    }
  };
  const nextSlide = () => {
    if (active === slides.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };
  
  return (
    <StyledContainer>
      {slides?.map((slide, index) => {
        if (index === active) {
          return (
            <Wrapper key={index} style={{ background: `${slide.background}` }}>
              <div className="slide">
                <div className="image">
                  <img src={slide.src} style={{ height: "80%" }} alt="" />
                </div>
                <div className="description">
                  <h2>{slide.content.h2}</h2>
                  <p>Upto 40% off </p>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/products")}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </Wrapper>
          );
        }
      })}
      <ImageContainer className="left" onClick={prevSlide}>
        <ArrowCircleLeftOutlined />
      </ImageContainer>
      <ImageContainer className="right" onClick={nextSlide}>
        <ArrowCircleRightOutlined />
      </ImageContainer>
    </StyledContainer>
  );
};

export default Slider;

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 4,
  height: "350px",
  overflow: "hidden",
  position: "relative",
}));

const Wrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  position: "relative",
  backgroundColor: "red",
  height: "100%",

  "& .slide": {
    display: "flex",
    flex: 1,
    alignItems: "center",
    height: "100%",

    "& .image": {
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },

    "& .description": {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      alignItems: "start",
      justifyContent: "center",
      height: "100%",
      padding: "25px",
    },
  },
}));

const ImageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  cursor: "pointer",
  backgroundColor: "transparent",
  borderRadius: "50%",
  position: "absolute",

  "&.left": {
    left: 0,
  },

  "&.right": {
    right: 0,
  },
}));
