import React from "react";
import { connect } from "react-redux";
import {
  Form,
  FloatingLabel,
  FormControl,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { handleInquiryForm } from "../../../reducer/action";
import "../../../sass/form.scss";
import { handleEnterLeave, handleEnterMouse } from "../../common";

class InquiryForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  };

  submituserRegistrationForm = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.props
        .handleInquiryForm({
          ...this.state.fields,
          formType: this.props.isContact ? "Contect Us" : "Product Inquiry",
        })
        .then((resp) => {
          if (resp.status === 200) {
            let fields = {};
            fields["name"] = "";
            fields["emailid"] = "";
            fields["phone"] = "";
            fields["message"] = "";
            this.setState({ fields: fields });
          }
        });
    }
  };

  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your Name.";
    }

    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["phone"]) {
      formIsValid = false;
      errors["phone"] = "*Please enter your mobile no.";
    }

    if (typeof fields["phone"] !== "undefined") {
      if (!fields["phone"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["phone"] = "*Please enter valid mobile no.";
      }
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  render() {
    return (
      <Form name="inquiryForm" onSubmit={this.submituserRegistrationForm}>
        <Row>
          <Col xs={12}>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <FormControl
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.fields.name}
                onChange={this.handleChange}
                isInvalid={this.state.errors.name}
              />
              <FormControl.Feedback type="invalid">
                {this.state.errors.name}
              </FormControl.Feedback>
            </FloatingLabel>
          </Col>
          <Col xl={this.props.isContact ? 12 : 6} xs={12}>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <FormControl
                type="text"
                name="emailid"
                placeholder="Email"
                value={this.state.fields.emailid}
                onChange={this.handleChange}
                isInvalid={this.state.errors.emailid}
              />
              <FormControl.Feedback type="invalid">
                {this.state.errors.emailid}
              </FormControl.Feedback>
            </FloatingLabel>
          </Col>
          <Col xl={this.props.isContact ? 12 : 6} xs={12}>
            <FloatingLabel
              controlId="floatingPhone"
              label="Phone"
              className="mb-3"
            >
              <FormControl
                type="text"
                name="phone"
                placeholder="Phone"
                value={this.state.fields.phone}
                onChange={this.handleChange}
                isInvalid={this.state.errors.phone}
              />
              <FormControl.Feedback type="invalid">
                {this.state.errors.phone}
              </FormControl.Feedback>
            </FloatingLabel>
          </Col>
          <Col xs={12}>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Message"
              className="mb-3"
            >
              <FormControl
                as="textarea"
                placeholder="Message"
                name="message"
                value={this.state.fields.message}
                onChange={this.handleChange}
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Col>
          <Col xs={12}>
            <Button
              type="submit"
              className="float-end"
              onMouseEnter={handleEnterMouse}
              onMouseLeave={handleEnterLeave}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  handleInquiryForm,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryForm);
