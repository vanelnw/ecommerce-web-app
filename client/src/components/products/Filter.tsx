import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Typography,
  Rating,
  Slider,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/configueStore";
import {
  clearFilter,
  filterByDelivery,
  filterByPrice,
  filterByRating,
  filterByStock,
  sortByPrice,
} from "../../store/filter";
import CategorieFilter from "./CategorieFilter";

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();

  const { byFastDelivery, byPrice, byRating, byStock, sort } = useAppSelector(
    (state) => state.entities.filters
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(sortByPrice((event.target as HTMLInputElement).value));
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch(filterByPrice(newValue));
    }
  };

  return (
    <div className="filter-sticky">
      <Container>
        <span>Filter Products By:</span>
        <CategorieFilter />
        <span className="filterItem">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              onChange={handleChange}
            >
              <FormControlLabel
                value="lowToHigh"
                control={<Radio checked={sort === "lowToHigh"} />}
                label="Ascending"
                labelPlacement="start"
              />
              <FormControlLabel
                value="highToLow"
                control={<Radio checked={sort === "highToLow"} />}
                label="Descending"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
        </span>
        <span className="filterItem">
          <FormControlLabel
            control={
              <Checkbox
                checked={byStock}
                onChange={() => {
                  dispatch(filterByStock(""));
                }}
                name="checkedA"
                color="primary"
              />
            }
            label="Include Out of Stock"
            labelPlacement="start"
          />
        </span>

        <span className="filterItem">
          <FormControlLabel
            control={
              <Checkbox
                checked={byFastDelivery}
                onChange={() => dispatch(filterByDelivery(""))}
                name="checkedB"
                color="primary"
              />
            }
            label="Fast Delivery Only"
            labelPlacement="start"
          />
        </span>
        <span className="filterItem">
          <Typography>Price:</Typography>
          <Slider
            sx={{ ml: 1.5 }}
            value={byPrice}
            valueLabelDisplay="auto"
            min={100}
            max={1000}
            onChange={handlePriceChange}
          />
        </span>

        <span className="filterItem">
          <Typography>Rating:</Typography>
          <Rating
            value={byRating}
            onChange={(event, newValue) => {
              dispatch(filterByRating(newValue));
            }}
            style={{ cursor: "pointer" }}
          />
        </span>

        <Button
          variant="contained"
          onClick={() => {
            dispatch(clearFilter(" "));
          }}
        >
          Clear Filters
        </Button>
      </Container>
    </div>
  );
};

export default Filter;

const Container = styled("div")(({ theme }) => ({
  backgroundColor: "#343a40",
  display: "flex",
  justifyContent: "flex-start",
  flex: 1,
  flexDirection: "column",
  gap: "20px",

  fontWeight: "500",
  margin: "10px",
  marginTop: "40px",
  padding: "10px",

  borderRadius: "10px",

  background: "rgba(0,0,0,0.3)",

  "& .filterItem": {
    "& .MuiFormControlLabel-root": {
      margin: "0px",
    },

    paddingBottom: "10px",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
}));
