import { styled } from "@mui/material";
import React from "react";
import Filter from "../components/products/Filter";
import SingleProduct from "../components/products/SingleProduct";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useAppSelector } from "../store/configueStore";
import { getFilteredProducts } from "../store/products";
import { Product } from "../store/models/productModel";
import noData from "../assets/No-data.svg";

const ProductsList: React.FC = () => {
  const FilteredProducts = useAppSelector(getFilteredProducts);

  return (
    <div>
      <div className="productList">
        <Filter />
        <ProductContainer>
          {FilteredProducts.length ? (
            FilteredProducts?.map((prod: Product) => (
              <SingleProduct prod={prod} key={prod._id} />
            ))
          ) : (
            <ImageContainer>
              <img
                src={noData}
                alt="no data"
                style={{ width: 500, height: 500 }}
              />
            </ImageContainer>
          )}
        </ProductContainer>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductsList;

const ProductContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flex: 4,
  padding: "40px 20px",
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

const ImageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));
