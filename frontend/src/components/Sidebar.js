/* eslint-disable react/prop-types */
/*eslint-disable*/
/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Row, Col } from "reactstrap";

import logo from "../assets/logos/ALPSlogo_noSoftware.png";

import logocam from "../assets/logos/ca-logo-white.png";
import logoifm from "../assets/logos/ifm-logo.png";
import logoPitch from "../assets/logos/pitchin-logo-white.svg";
import Box from '@material-ui/core/Box';

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a className="simple-text logo-normal">{this.props.appState === "0" ? "LICENSEE" : "LICENSOR"}</a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
                    {/* <li className="active active-pro" key={1}> */}
                    <NavLink
                      to="/dashboard"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Dashboard
                    </NavLink>
                    {/* </li> */}
                    {/* <li className=" active-pro" key={2}> */}
                    <NavLink
                      to="/dashboard"
                      className="nav-link"
                      activeClassName="active"
                    >
                      placeholder
                    </NavLink>
                    {/* </li> */}
          </Nav>
          <Box mt={18} px={1}>
            <Row>
              <Col>
                <div className="img-logo">
                  <img src={logocam} alt="react-logo" />
                </div>
              </Col>
              <Col>
                <div className="img-logo">
                  <img src={logoifm} alt="react-logo" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Box px={8}>
                  <div className="img-logo">
                    <img src={logoPitch} alt="react-logo" />
                  </div>
                </Box>
              </Col>
            </Row>
          </Box>
        </div>
      </div>
    );
  }
}

export default Sidebar;
