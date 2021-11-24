import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import map from "lodash/map";
import ComNavigation from "../ComNavigation";
import "../../sass/export.scss";
import { getExportData } from "../../reducer/action";

const Export = (props) => {
  const { exportData } = props || {};

  useEffect(() => {
    props.getExportData();
  }, []);

  return (
    <section>
      <ComNavigation title="Export" />
      <div className="spadding">
        <div className="container position-relative">
          <Row>
            <Col className="export_block" md={9}>
              <h6
                className="sub-title"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-duration="500"
              >
                {exportData?.sub_title}
              </h6>
              <p
                className="desc"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-duration="500"
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: exportData?.description,
                  }}
                />
              </p>
            </Col>
            <Col
              xs={12}
              className="d-flex justify-content-center mt-3 export_block flex-wrap"
            >
              {exportData &&
                map(exportData.more_details.split("|"), (item, index) => (
                  <span
                    className="export_contry"
                    key={`contry_${index}`}
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-delay="150"
                    data-aos-duration="500"
                  >
                    {item}
                  </span>
                ))}
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  exportData: state?.exportData,
});
const mapDispatchToProps = {
  getExportData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Export);
