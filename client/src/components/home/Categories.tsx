import {
  Box,
  CircularProgress,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

import Ratings from "../Rating";
import { useAppSelector } from "../../store/configueStore";
import { getProductsByCategory } from "../../store/products";

interface Props {
  title: string;
}

const Categories: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  const products = useAppSelector(getProductsByCategory(title));

  const items = products?.map((prod) => {
    return (
      <ProductWrapper
        elevation={3}
        sx={{ borderRadius: "15px" }}
        onClick={() => navigate(`/product/${prod._id}`)}
      >
        <img src={prod.image} alt={prod.name} />

        <Box margin="8px">
          <div
            style={{
              height: "25px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="span"
              style={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {prod.name}
            </Typography>
          </div>

          <Typography variant="body2" color="textSecondary" component="p">
            <span>$ {prod.price}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Ratings
              rating={prod.ratings}
              text={`${prod.numReviews} reviews`}
            />
          </Typography>
        </Box>
      </ProductWrapper>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <Box sx={{ margin: "20px 0px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        marginTop="20px"
        marginBottom="10px"
      >
        <strong>{title}</strong>
        <Link to="/products">
          <span className="float-right text-secondary">View All</span>
        </Link>
      </Box>
      <Paper sx={{ minHeight: "250px" }} className="catPoper">
        {!products.length ? (
          <CircularProgress />
        ) : (
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={2000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay={products.length > 4}
            items={items}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Categories;

const ProductWrapper = styled(Paper)(({ theme }) => ({
  padding: "10px",
  margin: "15px",
  maxWidth: "250px",
  height: "100%",

  "&.MuiPaper-rounded": {
    borderRadius: "15px",
  },

  ":hover": {
    background: "linear-gradient(to right bottom, #36EAEF, #6B0AC9)",
    boxShadow: theme.shadows[9],
    border: "1px solid green",
  },
  img: {
    width: "100%",
    borderRadius: "15px",
    height: "100px",
    objectFit: "cover",
  },
  "& .MuiButton-containedSizeSmall": {
    padding: "1px",
    fontSize: "0.5rem",
  },
}));
