import React from "react";
import { withRouter } from "react-router";
import HostMenubar from "../Host/components/Menubar";
// import HomeRouter from "../routes";
import HostFooter from "../Host/components/Footer";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";

const WrapperLayout = (props) => {
  console.log("=========props", props);

  return props.isHost ? (
    <>
      <HostMenubar />
      {props.children}
      <HostFooter />
    </>
  ) : (
    <>
      <Menubar />
      {props.children}
      <Footer />
    </>
  );
};

export default withRouter(WrapperLayout);
