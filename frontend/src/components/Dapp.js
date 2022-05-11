import React from "react";

import { Switch, NavLink, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivateRoute from "../utils/PrivateRoute.js";
import PublicRoute from "../utils/PublicRoute.js";

export class Dapp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Dapp">
        <BrowserRouter>
          <div>
            <div className="header">
              <NavLink exact activeClassName="active" to="/">
                Home |{" "}
              </NavLink>
              <NavLink activeClassName="active" to="/login">
                Login |{" "}
              </NavLink>
              <NavLink activeClassName="active" to="/dashboard">
                Dashboard{" "}
              </NavLink>
            </div>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
