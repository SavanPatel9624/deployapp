import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import map from "lodash/map";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../sass/carousel.scss";
import { Button, Image } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { handleEnterLeave, handleEnterMouse } from "../../common";

const CarouselComp = (props) => {
  const [carouselJson, setCarouselJson] = useState([]);

  useEffect(() => {
    if (props.carouselJson) {
      setCarouselJson(props.carouselJson);
    }
  }, [props.carouselJson]);

  useEffect(() => () => handleEnterLeave(), []);

  return (
    <div className="position-relative">
      <Carousel
        infiniteLoop
        interval={5000}
        transitionTime={2000}
        showThumbs={false}
        showStatus={false}
        className="home_carousel_block"
        fade
        stopOnHover={false}
      >
        {map(carouselJson, (item, index) => (
          <div className="carousel_block" key={`carousel_${index}`}>
            <Image src={item.img} />
            <div className="carousel_box">
              <span className="carousel_sub_tilte">{item.sub_title}</span>
              <h2 className="carousel_headar">{item.title}</h2>
              <p className="carousel_desc">{item.description}</p>
              <a>
                <Button
                  className="carousel_read_more_button big_cursor"
                  onClick={() => props.history.push("/collection")}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <span>READ MORE</span>
                </Button>
              </a>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const mapStateToProps = (state) => ({
  carouselJson: state?.homeAllData?.homeCarouselData,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CarouselComp));
