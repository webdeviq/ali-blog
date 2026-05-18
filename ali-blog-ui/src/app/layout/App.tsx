import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 10, md: 12 },
          pb: 8,
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </>
  );
}