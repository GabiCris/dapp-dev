import React from "react";

import { Switch, NavLink,Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./utils/PrivateRoute.js";
import PublicRoute from "./utils/PublicRoute.js";

import PerfectScrollbar from "perfect-scrollbar";
import Footer from "./components/Footer.js";
import Sidebar from "./components/Sidebar.js";
import DemoNavbar from "./components/DemoNavbar.js";

var ps;
export class Dapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
    };
    this.mainPanel = React.createRef();
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  render() {
    return (
      <div className="wrapper">
        <BrowserRouter>
          <Sidebar
            {...this.props}
            bgColor={this.state.backgroundColor}
            activeColor={this.state.activeColor}
          />
          <div className="main-panel" ref={this.mainPanel}>
            <DemoNavbar {...this.props} />
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
            <Footer fluid />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
