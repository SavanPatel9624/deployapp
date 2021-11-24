import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AboutHome from "./aboutHome";
import CarouselComp from "./Carousel";
import HomeCollections from "./HomeCollections";
import { getAllData, handleFirstTimeLoad } from "../../reducer/action";
import Loader from "../../common/Loader";

const Home = (props) => {
  const [isPageLoad, setIsPageLoad] = useState(true);

  useEffect(() => {
    props.getAllData();
  }, []);

  useEffect(() => {
    if (!props.isFirstTimeLoad) {
      setTimeout(() => {
        setIsPageLoad(false);
        props.handleFirstTimeLoad(true);
      }, 3000);
    }
  }, [props.isFirstTimeLoad]);

  return (
    <div>
      {isPageLoad && !props.isFirstTimeLoad && <Loader />}
      <CarouselComp handleGetData={props.getAllData} />
      <AboutHome handleGetData={props.getAllData} />
      <HomeCollections handleGetData={props.getAllData} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFirstTimeLoad: state.isFirstTimeLoad,
});
const mapDispatchToProps = {
  getAllData,
  handleFirstTimeLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
