import { Facebook, GitHub, LinkedIn, LocationOn, MailOutlined, Phone, Twitter } from '@mui/icons-material';
import { Box, Divider, styled, Typography } from '@mui/material'
import React from 'react'

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flex: 1,
  background: "#656665",
  height: "35vh",
  color: "white",
  padding:"10px"
}));
const Links = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flex: 1,
  gap: "30px",
  padding: "0px 10px",

  p: {
    color:"black"
  }
}));
const Adresses = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  flex: 1,
  gap: "30px",

  div: {
    display: "flex",
    justifyContent: "center",

    div: {
      display: "flex",
      justifyContent: "center",
      alignItems:"center",
      height: "35px",
      width:"35px",
      backgroundColor: "#33383b",
      borderRadius: "50%",
    },

    span: {
      marginLeft: "5px",
    },
  },
}));

const About = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent:"center",
  flex: 1,
  gap: "30px",
  padding:"0px 10px"
}));

const Footer = () => {
  return (
    <div>
      <Container>
        <Links>
          <h3>Company Logo</h3>

          <span className="footer-links">
            <a href="#" className="link-1">
              Home
            </a>

            <a href="#">Blog</a>

            <a href="#">Pricing</a>

            <a href="#">About</a>

            <a href="#">Faq</a>

            <a href="#">Contact</a>
          </span>
          <p>Company Name © 2022</p>
        </Links>
        <Adresses sx={{ flex: 1 }}>
          <div>
            <div>
              <LocationOn />
            </div>

            <span>444 S. Cedros Ave Solana Beach, California</span>
          </div>
          <div>
            <div>
              <Phone />
            </div>

            <span> +1.555.555.5555</span>
          </div>
          <div>
            <div>
              <MailOutlined />
            </div>

            <span>
              <a href="mailto:support@company.com">support@company.com</a>
            </span>
          </div>
        </Adresses>
        <About sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            About the Company
          </Typography>
          <p>
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
            euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>
          <Box>
            <Facebook fontSize="large" />
            <Twitter fontSize="large" />
            <LinkedIn fontSize="large" />
            <GitHub fontSize="large" />
          </Box>
        </About>
      </Container>
      
    </div>
  );
}

export default Footer