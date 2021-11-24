import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
// import Footer from "./components/Footer";
// import Menubar from "./components/Menubar";
// import HomeRouter from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/style.scss";
import "./index.css";
import HomeRouter from "./routes";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <HomeRouter />
    </Router>
  );
}

export default App;
