import React, { useState } from "react";
import { Product } from "../../store/models/productModel";
import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Ratings from "../Rating";
import { useAppDispatch, useAppSelector } from "../../store/configueStore";
import { cartAdded, cartRemoved } from "../../store/cart";

type ProSingle = {
  prod: Product;
  key: string;
};

const SingleProduct: React.FC<ProSingle> = ({ prod }) => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.entities.cart.cartItems);

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="singleWrapper">
      <ProductWrapper
        elevation={3}
        onMouseEnter={(e) => {
          setShow(true);
        }}
        onMouseLeave={() => setShow(false)}
        className="productWrapper"
      >
        <div className="content">
          <img src={prod.image} alt={prod.name} />
          <Box sx={{ p: "10px" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="span"
              style={{ fontSize: "14px", fontWeight: "bold" }}
            >
              {prod.name}
            </Typography>
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

            {show && (
              <ButtonContainer>
                {cart?.some((ele) => ele._id === prod._id) ? (
                  <Button
                    onClick={() => dispatch(cartRemoved(prod._id))}
                    disabled={!prod.inStock}
                    variant="contained"
                    size="small"
                    sx={{ p: "2px", bgcolor: "red" }}
                  >
                    Remove from Cart
                  </Button>
                ) : (
                  <Button
                    onClick={() => dispatch(cartAdded(prod))}
                    disabled={!prod.inStock}
                    variant="contained"
                    size="medium"
                    sx={{ p: "2px" }}
                  >
                    {!prod.inStock ? "Out of Stock" : "Add to Cart"}
                  </Button>
                )}
                <Button
                  size="medium"
                  variant="contained"
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={() => navigate(`/product/${prod._id}`)}
                >
                  View
                </Button>
              </ButtonContainer>
            )}
          </Box>
        </div>
      </ProductWrapper>
    </div>
  );
};

export default SingleProduct;

const ProductWrapper = styled(Paper)(({ theme }) => ({
  width: "85%",
  "&.MuiPaper-rounded": {
    borderRadius: "15px",
  },
  img: {
    width: "100%",
    borderRadius: "15px",
    height: "150px",
    objectFit: "cover",
  },
  "& .MuiButton-containedSizeSmall": {
    padding: "1px",
    fontSize: "0.5rem",
  },
  "& .button": {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
  },
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
}));
