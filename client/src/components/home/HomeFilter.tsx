import { styled } from '@mui/material';
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/configueStore';
import { filterByCategory } from '../../store/filter';
import electronic from '../../assets/electronics.jpg' 
import electronic1 from "../../assets/electtronics2.jpg";
import electronic2 from "../../assets/electtronics3.jpg";
import men from "../../assets/men-cothiing1.jpg";
import women from "../../assets/woman-clothiing1.jpg";
import women2 from "../../assets/woman-clothing2.jpg";
import women3 from "../../assets/woman-clothing3.jpg";
import jewellery from "../../assets/jewellery1.jpg";
import jewellery2 from "../../assets/jewellery2.jpg";

const CatContainer = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
}));

const Cat = styled("div")(() => ({
  display: "flex",
  flexWrap:"nowrap",
    // justifyContent: "space-between",
  gap: "20px",
    
 width: "75%",
  overflowX:"scroll",
  
  //  display: flex;
  //   flex-direction: row;
  //   flex-wrap: nowrap;
  //   overflow-x: scroll;
  //   padding: 20px 25px;

  //   ::-webkit-scrollbar {
  //     display: none;
  //   }

    "& .app__properties-item": {
      //flex: 1,
      width:"200px",
      border: "1px solid black",
        padding: "10px",
    textAlign:"center"
  }
}));


const HomeFilter = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = (cat: string) => () => {
      dispatch(filterByCategory(cat));
      navigate("/products");
    };
  return (
    <CatContainer>
      <h1>Filter by category</h1>
      <Cat>
        {[
          {
            img: electronic2,
            title: "electronics",
            properties: 123,
          },
          {
            img: men,
            title: "men's clothing ",
            properties: 123,
          },
          {
            img: women2,
            title: "women's clothing",
            properties: 123,
          },
          {
            img: jewellery2,
            title: "jewelery",
            properties: 123,
          },
          // {
          //   img: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
          //   title: "Reno",
          //   properties: 123,
          // },
        ].map((item, i) => (
          <div
            key={i}
            className="app__properties-item"
            onClick={handleClick(item.title)}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "100%", height: "150px" }}
            />
            <span>{item.title}</span>
            {/* <div className="app__properties-title">
              <h1>{item.title}</h1>
              <h2>{`${item.properties} hotels`}</h2>
            </div> */}
          </div>
        ))}
      </Cat>
    </CatContainer>
  );
}

export default HomeFilter