import {
  Box,
  Button,
  FormControl,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import {
  styled,
  Rating,
  TextareaAutosize,
  Stack,
  Alert,
  Container,
} from "@mui/material";
import Ratings from "./Rating";

import { useAppDispatch, useAppSelector } from "../store/configueStore";
import { getProductsById } from "../store/products";
import { cartAdded, cartRemoved } from "../store/cart";
import { addProductsReview } from "../store/products";

const ProductDetails: React.FC = () => {
  const classes = useStyles();

  const params = useParams();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.entities.cart.cartItems);
  const prod = useAppSelector(getProductsById(params.id!));
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  console.log(prod);

  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddReview = () => {
    dispatch(addProductsReview({productId:prod!._id, rating, comment }))
  }

  return (
    <Container>
      <Details>
        <div className="image">
          <img alt={prod?.name} src={prod?.image} />
        </div>

        <div className="details">
          <Typography gutterBottom variant="h5" component="h2">
            {prod?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {prod?.description}
          </Typography>

          <Box className="infos">
            <div className="tab">
              <Typography gutterBottom variant="h5" component="h6">
                Price
              </Typography>
              <span>₹ {prod?.price}</span>
            </div>
            <div className={classes.tab}>
              <Typography gutterBottom variant="h5" component="h6">
                Status
              </Typography>
              {prod?.inStock! > 0 ? (
                <span>In Stock</span>
              ) : (
                <span>unavailable</span>
              )}
            </div>
            <div className={classes.tab}>
              <Typography gutterBottom variant="h5" component="h6">
                Reviews
              </Typography>
              <Ratings
                rating={prod?.ratings!}
                text={`${prod?.numReviews} reviews`}
              />
            </div>
            {prod?.inStock! > 0 ? (
              <>
                <div className={classes.tab}>
                  <Typography gutterBottom variant="h5" component="h6">
                    Quantity
                  </Typography>
                  <FormControl className={classes.margin}>
                    <NativeSelect
                      id="demo-customized-select-native"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    >
                      <option aria-label="None" value="" />
                      {[...Array(prod?.inStock)].map((_, x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>

                {cart?.some((ele) => ele._id === prod!._id) ? (
                  <Button
                    onClick={() => dispatch(cartRemoved(prod!._id))}
                    disabled={!prod!.inStock}
                    variant="contained"
                  >
                    Remove from Cart
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!prod!.inStock}
                    onClick={() => dispatch(cartAdded(prod!))}
                  >
                    {!prod!.inStock ? "Out of Stock" : "Add to Cart"}
                  </Button>
                )}
              </>
            ) : null}
          </Box>
        </div>
      </Details>
      <Reviews>
        <Box className="userReview">
          <Typography gutterBottom variant="h5" component="h6">
            REVIEWS
          </Typography>
          <span>No Revirws</span>

          <strong>Admin Doe</strong>

          <Ratings rating={0} />
          <span>Jan 12 2021</span>
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography gutterBottom variant="h5" component="h6">
            WRITE A REVIEWS
          </Typography>
          <form>
            <Box display="flex" alignItems="center">
              <strong>Rating:</strong>
              <Rating
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <strong>Comment:</strong>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                placeholder="Comment"
                style={{ width: "75%" }}
                onChange={(e) => setComment(e.target.value)}
              />
            </Box>
            <div>
              <Button
                variant="contained"
                disabled={!userInfo}
                onClick={handleAddReview}
              >
                Submit
              </Button>
            </div>
          </form>
          <Alert severity="error">This is an error alert — check it out!</Alert>
          {!userInfo ? (
            <Stack
              sx={{ width: "100%", marginTop: "10px", bgColor: "orange" }}
              spacing={2}
            >
              <Alert severity="warning">
                Please{" "}
                <Link to="/login">
                  " <strong>Login</strong> "
                </Link>{" "}
                to submit a review{" "}
              </Alert>
            </Stack>
          ) : null}
        </Box>
      </Reviews>
    </Container>
  );
};

export default ProductDetails;


const Details = styled("div")(({ theme }) => ({
  display: "flex",

  "& .image": {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  "& .details": {
    flex: 1,
    padding: "10px",
    marginBottom: "30px",

    "& .infos": {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: "15px",
      gap: "10px",

      "& .tab": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
  },

  img: {
    width: "50%",
    height: "50vh",
  },
}));

const Reviews = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "30px",

  "& .userReview": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
}));

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  productDetails: {
    display: "flex",
    justifyContent: "center",
  },
  reviews: {
    display: "flex",
    justifyContent: "center",
  },
  singleImage: {},
  details: {},
  tab: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {},

  margin: {},
});
