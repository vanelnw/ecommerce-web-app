import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import headPhone from "../../assets/headphone.png";

const HeadBanner = () => {
  return (
    <HeroContainer>
      <div>
        <p className="beats-solo">heroBanner.smallText</p>
        <h3>heroBanner.midText</h3>
        <h1>heroBanner.largeText1</h1>
        <HeroImage src={headPhone} alt="headphones" />

        <div>
          <Link to={`/products/`}>
            <HeroButton type="button">button</HeroButton>
          </Link>
          <HeroDesc>
            <h5>Description</h5>
            <p>heroBanner.desc</p>
          </HeroDesc>
        </div>
      </div>
    </HeroContainer>
  );
};

export default HeadBanner;

const HeroContainer = styled("div")(() => ({
  padding: "40px",
  background: "#dcdcdc",
  borderRadius: "15px",
  position: "relative",
  height: "300px",
  lineHeight: 0.9,

  "& .beats-solo": {
    fontSize: "20px",
  },

  "& .desc": {
    fontSize: "20px",
  },
}));

const HeroImage = styled("img")(() => ({
  position: "absolute",
  top: "0%",
  right: "20%",
  width: "350px",
  height: "350px",
}));

const HeroButton = styled("button")(() => ({
  borderRadius: "15px",
  padding: "10px 16px",
  backgroundColor: "white",
  color: "red",
  border: "none",
  marginTop: "40px",
  fontSize: "18px",
  fontWeight: 500,
  cursor: "pointer",
}));

const HeroDesc = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));
