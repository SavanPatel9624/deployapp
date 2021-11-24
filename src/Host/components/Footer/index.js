import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import map from "lodash/map";
import filter from "lodash/filter";
import ImageUploader from "react-images-upload";
import Alert from "../Alert";
import {
  Button,
  FloatingLabel,
  FormControl,
  Modal,
  Row,
} from "react-bootstrap";
import { getFooterData, handleUpdateFooterData } from "../../../reducer/action";
import { handleEnterLeave, handleEnterMouse } from "../../common";

const addressData = [
  { name: "company", title: "Company", defaultValue: "" },
  { name: "area", title: "Area", defaultValue: "" },
  { name: "landmark", title: "Landmark", defaultValue: "" },
  { name: "city", title: "City", defaultValue: "" },
  { name: "state", title: "State", defaultValue: "" },
  { name: "pincode", title: "Pincode", defaultValue: "" },
];

let data = [];
let addressFillData = [];
let updatAddress = false;
let dataTimeout;
const Footer = (props) => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState();
  const [addressJson, setAddressJson] = useState(addressData);
  const [isMessage, setIsMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { footerData } = props || {};
  const footerDataJson = [
    { name: "facebook", title: "Facebook", defaultValue: footerData?.facebook },
    {
      name: "instagram",
      title: "Instagram",
      defaultValue: footerData?.instagram,
    },
    { name: "twitter", title: "Twitter", defaultValue: footerData?.twitter },
    {
      name: "printrest",
      title: "Printrest",
      defaultValue: footerData?.printrest,
    },
    { name: "mobile", title: "Mobile", defaultValue: footerData?.mobile },
    { name: "email", title: "Email", defaultValue: footerData?.email },
  ];

  useEffect(() => {
    if (footerData?.address) {
      const oldAddress = [];
      const JionArray = footerData?.address?.split("$");
      addressJson.map((e, i) => (e.defaultValue = JionArray[i]));
      setAddressJson(addressJson);

      oldAddress["company"] = JionArray[0];
      JionArray.shift();
      oldAddress["adLine"] = JionArray.map((e) => e).join(", ");
      setAddress(oldAddress);
    }
  }, [footerData?.address]);

  const onDrop = (picture) => {
    handleChange({ target: { name: "file", value: picture[0] } });
    data["logo"] = footerData.logo;
  };
  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
  };
  const handleAddressChange = (e) => {
    updatAddress = true;
    filter(addressData, (o) => {
      if (o.name === e.target.name) {
        o.value = e.target.value.trim();
      }
    });
  };

  const handleClose = () => {
    if (show) {
      addressFillData = addressData;
    }
    setShow(!show);
  };

  const handleShowPopup = () => {
    addressFillData = addressData;
    setShow(!show);
  };

  const handleJoinAddress = () => {
    const data = [];
    map(addressFillData, (item) => {
      if (item.value) {
        data.push(item.value);
      } else {
        data.push(item.defaultValue);
      }
    });
    return data.map((e) => e).join("$");
  };

  const handleAlert = (loading, error, message) => {
    setIsMessage(message);
    setIsError(error);
    setIsLoading(loading);
  };

  const handleSubmit = () => {
    if (updatAddress) {
      data["address"] = handleJoinAddress();
    }
    props.handleUpdateFooterData(data, footerData.id).then((resp) => {
      if (resp?.message) {
        setShow(!show);
        props.getFooterData();
        addressFillData = [];
        data = [];
      }
    });
  };

  useEffect(() => {
    props.getFooterData();
  }, []);

  useEffect(() => {
    return () => {
      if (dataTimeout) {
        clearTimeout(dataTimeout);
      }
      clearTimeout(handleAlert(false, false, ""), 4000);
    };
  });

  return (
    <footer
      className="main-footer dark position-relative"
      style={{ clear: "both" }}
    >
      {isMessage && (
        <Alert isLoading={isLoading} isError={isError} isMessage={isMessage} />
      )}
      <Button
        className="add_new_carousel data_update_btn"
        onClick={handleShowPopup}
        onMouseEnter={handleEnterMouse}
        onMouseLeave={handleEnterLeave}
      >
        Update
      </Button>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 item-box">
            <div className="item abot">
              <div className="logo-footer">
                <Link
                  to="/"
                  className="logo"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <img src={footerData?.logo} alt="Alexa" />
                </Link>
              </div>
              <div className="social-icon">
                <a
                  href={footerData?.facebook}
                  target="_blank"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href={footerData?.instagram}
                  target="_blank"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href={footerData?.twitter}
                  target="_blank"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={footerData?.printrest}
                  target="_blank"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 item-box">
            <div className="item usful-links">
              <div className="fothead">
                <h6>Useful Links</h6>
              </div>
              <ul>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/">Home</Link>
                </li>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/company-profile">Company Profile</Link>
                </li>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/collection">Collections</Link>
                </li>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/catalogue">Catalogue</Link>
                </li>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 item-box">
            <div className="item fotcont write">
              <div className="fothead">
                <h6>Contact Us</h6>
              </div>
              <p>
                <a
                  href={`tel:+${footerData?.mobile}`}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-phone-volume"></i> +{footerData?.mobile}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${footerData?.email}`}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="far fa-envelope"></i> {footerData?.email}
                </a>
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 item-box">
            <div className="item fotcont">
              <div className="fothead">
                <h6>Visit</h6>
              </div>
              <span>
                <i className="fas fa-map-marker-alt"></i> {address?.company}
              </span>
              <p className="faddress">{address?.adLine}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        contentClassName="footer_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Footer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {map(footerDataJson, (item) => (
              <FloatingLabel
                controlId="floatingName"
                label={item.title}
                className="mb-3 col-lg-6 col-xs-12"
              >
                <FormControl
                  type="text"
                  name={item.name}
                  placeholder={item.title}
                  defaultValue={item?.defaultValue}
                  onChange={(e) => handleChange(e)}
                />
              </FloatingLabel>
            ))}
            {map(addressJson, (item) => (
              <FloatingLabel
                controlId="floatingName"
                label={item.title}
                className="mb-3 col-lg-6 col-xs-12"
              >
                <FormControl
                  type="text"
                  name={item.name}
                  placeholder={item.title}
                  defaultValue={item?.defaultValue}
                  onChange={(e) => handleAddressChange(e)}
                />
              </FloatingLabel>
            ))}
          </Row>
          <ImageUploader
            withPreview={true}
            withIcon={true}
            buttonText="Choose logo"
            onChange={onDrop}
            label={" Max file size: 100mb || accepted: jpg, jpeg, png"}
            imgExtension={[".jpg", ".jpeg", ".png"]}
            maxFileSize={105906176}
            singleImage={true}
            accept="image/jpg, image/jpeg, image/png"
            defaultImages={[footerData?.logo]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  footerData: state?.footerData,
});
const mapDispatchToProps = {
  getFooterData,
  handleUpdateFooterData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
