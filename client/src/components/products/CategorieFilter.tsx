import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../../store/configueStore";
import { filterByCategory } from "../../store/filter";
import { useNavigate } from "react-router-dom";

interface Props {
  onList?: boolean;
}

const CategorieFilter: React.FC<Props> = ({ onList }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories: string[] = useAppSelector(
    (state) => state.entities.products.categories
  );

  const filter = useAppSelector((state) => state.entities.filters.byCategory);

  const handleClick = (cat: string) => () => {
    dispatch(filterByCategory(cat));
    navigate("/products");
  };

  return (
    <StyledAccordion expanded={onList}>
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: "white" }} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <MenuIcon sx={{ color: "white" }} />
        <Typography sx={{ color: "white", m: "15px" }}>
          Sort By Categories
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {categories?.map((cat: string, i: React.Key) => (
          <AccordionItem
            key={i}
            onClick={handleClick(cat)}
            sx={{
              bgcolor: filter === cat ? "lightblue" : "#1E1E1E",
              color: filter === cat ? "black" : "white",
            }}
          >
            <Typography>{cat}</Typography>
          </AccordionItem>
        ))}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default CategorieFilter;

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  "&.MuiPaper-root": {
    backgroundColor: "#1E1E1E"
  },
}));
const AccordionItem = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  border: "1px solid grey",
  backgroundColor: "#1E1E1E",
  borderRadius: "5px",
  marginBottom: "20px",
  color: "white",
  ":hover": {
    backgroundColor: "lightblue",
    color: "black",
  },
}));
