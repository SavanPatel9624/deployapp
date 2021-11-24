import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import bgImage from "../../asset/comNavigation.jpg";
import { handleEnterLeave, handleEnterMouse } from "../../common";

const ComNavigation = ({ title, isAbout, isMedia }) => {
  return (
    <section className="inner-head">
      <div className="bg_image">
        <Image src={bgImage} />
      </div>
      <div className="container common_details">
        <div className="common-box">
          <div className="ih-title text-center">
            <h1 className="playfont wow flipInX">{title}</h1>
          </div>
          <div className="breadcummain">
            <ul className="justify-content-center">
              <li
                onMouseEnter={handleEnterMouse}
                onMouseLeave={handleEnterLeave}
              >
                <Link to="/u/home">Home</Link>
              </li>
              {isAbout && (
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  About Us
                </li>
              )}
              {isMedia && (
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <Link to="/u/media-kit">Media Kit</Link>
                </li>
              )}
              <li
                onMouseEnter={handleEnterMouse}
                onMouseLeave={handleEnterLeave}
              >
                {title}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ComNavigation;
