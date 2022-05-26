
import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import Slider from "../components/home/Slider";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import CovidOffer from "../components/home/CovidOffer";
import Categories from "../components/home/Categories";
import { useAppDispatch } from "../store/configueStore";
import { loadProducts, loadProductsCategories } from "../store/products";
import HomeFilter from "../components/home/HomeFilter";
import HeadBanner from "../components/home/HeadBanner";


const Home: React.FC = () => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(loadProducts());

    dispatch(loadProductsCategories());
  }, []);

  return (
    <>
      <Box display="flex">
        {/* <CategorieFilter onList /> */}
        <Slider />
      </Box>
      <Container>
        <HomeFilter />
        {/* {categories?.map((cat, i) => (

        <Categories key={i} cat={cat} />
      ))} */}

        <Categories title="electronics" />
        <HeadBanner />
        <Categories title="jewelery" />
        <CovidOffer />
        <Categories title="women's clothing" />
        <Categories title="men's clothing" />
      </Container>
      <Newsletter />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
