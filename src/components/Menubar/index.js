import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import map from "lodash/map";
import {
  Navbar,
  Nav,
  Container,
  Image,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { connect } from "react-redux";
import { handleCursor, handleEnterMouse, handleEnterLeave } from "../../common";

const navLinks = [
  {
    name: "About",
    url: "/about",
    submenu: [
      { name: "Company Profile", url: "/company-profile" },
      { name: "Infrastructure", url: "/infrastructure" },
      { name: "Media Kit", url: "/media-kit" },
    ],
  },
  {
    name: "Collection",
    url: "/collection",
  },
  {
    name: "Catalogue",
    url: "/catalogue",
  },
  {
    name: "Export",
    url: "/export",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

AOS.init();

const Menubar = (props) => {
  const [isExpend, setIsExpend] = useState(false);
  const { logo } = props || {};

  useEffect(() => {
    handleCursor();
  }, []);

  return (
    <Navbar
      collapseOnSelect={false}
      expand="md"
      bg="dark"
      variant="dark"
      expanded={isExpend}
      onToggle={() => setIsExpend(!isExpend)}
      sticky="top"
    >
      <span id="circle" class="circle" />
      <Container>
        <Navbar.Brand href="#">
          <Image src={logo} rounded />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onMouseEnter={handleEnterMouse}
          onMouseLeave={handleEnterLeave}
        />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav>
            <NavLink
              to="/"
              onClick={() => setIsExpend(!isExpend)}
              className="nav-link"
              activeClassName="active"
              exact
              onMouseEnter={handleEnterMouse}
              onMouseLeave={handleEnterLeave}
            >
              Home
            </NavLink>
            {map(navLinks, (item, index) =>
              !item.submenu ? (
                <NavLink
                  to={item.url}
                  onClick={() => setIsExpend(!isExpend)}
                  className="nav-link"
                  activeClassName="active"
                  key={`menu_${index}`}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  {item.name}
                </NavLink>
              ) : (
                <DropdownButton
                  title={item.name}
                  className="nav-link"
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                  key={`menu_${index}`}
                >
                  {map(item.submenu, (sub, i) => (
                    <Dropdown.Item
                      key={`submenu_${i}`}
                      eventKey={i + 1}
                      onClick={() => isExpend && setIsExpend(!isExpend)}
                      onMouseEnter={handleEnterMouse}
                      onMouseLeave={handleEnterLeave}
                    >
                      {console.log({ sub })}
                      <NavLink
                        to={sub.url}
                        activeClassName="active"
                        onMouseEnter={handleEnterMouse}
                        onMouseLeave={handleEnterLeave}
                      >
                        {sub.name}
                      </NavLink>
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const mapStateToProps = (state) => ({
  logo: state?.footerData?.logo,
});
export default connect(mapStateToProps, null)(Menubar);
