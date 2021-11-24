import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../sass/loader.scss";

const Loader = (props) => {
  const [progressValue, setProgressValue] = useState(0);
  const { logo } = props || {};

  useEffect(() => {
    setTimeout(() => {
      if (progressValue <= 100) {
        setProgressValue(progressValue + 1);
      }
    }, 15);
  }, [progressValue]);

  return (
    <div className="page_loader_block">
      <CircularProgressbarWithChildren
        value={progressValue}
        strokeWidth={2}
        styles={{
          path: {
            stroke: `#f07c00`,
          },
        }}
      >
        <img style={{ height: 60 }} src={logo} alt={logo} />
      </CircularProgressbarWithChildren>
    </div>
  );
};

const mapStateToProps = (state) => ({
  logo: state?.footerData?.logo,
});
export default connect(mapStateToProps, null)(Loader);
