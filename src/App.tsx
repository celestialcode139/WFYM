import { Box } from "@mui/material";
import Header from "./components/header/header";
import Footer from "./components/header/footer";
import HeroSection from "./components/heroSection";
import "./App.css";

function App() {
  return (
    <Box className={`landingPage`}>
      <Header />
      <HeroSection />
      <Footer />
    </Box>
  );
}

export default App;
