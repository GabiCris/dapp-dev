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
/*eslint-disable*/
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import {
  Row,
  Col,
  Container,
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>

            <div className="credits ml-auto">
              <div className="copyright">
              This is an application developed for a research project conducted by the Engineering Department,  University of Cambridge,  sponsored by Research England’s Connecting Capability Fund award CCF18-7157 - 
              Promoting the Internet of Things via Collaboration between HEIs and Industry (Pitch-In).
              </div>

              <div className="footerText">
                &copy; {1900 + new Date().getYear()}, ALPS
              </div>
            </div>

          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
