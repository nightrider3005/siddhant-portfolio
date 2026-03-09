import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser
} from "react-icons/ai";

import { CgFileDocument } from "react-icons/cg";
import { HiOutlineLightBulb } from "react-icons/hi";

function NavBar() {

  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  // Scroll effect
  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY >= 20) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    }

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);

  }, []);

  return (

    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >

      <Container>

        {/* Logo */}

        <Navbar.Brand
          as={Link}
          to="/"
          className="logo-text"
          onClick={() => updateExpanded(false)}
        >
          SG.
        </Navbar.Brand>


        {/* Mobile Toggle */}

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>


        {/* Navigation Items */}

        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="ms-auto">

            {/* Home */}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>


            {/* About */}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>


            {/* Projects */}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Projects
              </Nav.Link>
            </Nav.Item>


            {/* Creative Lab */}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/creative"
                onClick={() => updateExpanded(false)}
              >
                <HiOutlineLightBulb style={{ marginBottom: "2px" }} /> Creative Lab
              </Nav.Link>
            </Nav.Item>


            {/* Resume */}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Resume
              </Nav.Link>
            </Nav.Item>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>

  );
}

export default NavBar;