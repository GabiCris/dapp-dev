import React from "react";

import { Switch, NavLink, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./utils/PrivateRoute.js";
import PublicRoute from "./utils/PublicRoute.js";

import PerfectScrollbar from "perfect-scrollbar";
import Footer from "./components/Footer.js";
import Sidebar from "./components/Sidebar.js";
import DemoNavbar from "./components/DemoNavbar.js";
import { ethers } from "ethers";
import { getToken } from "utils/Common";
import ManagerArtifact from "contracts/ManagerContract.json";
import EntityArtifact from "contracts/EntityContract.json";

var ps;
export class Dapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      entity: undefined,
      managerData: [],
    };
    this.mainPanel = React.createRef();
    this.token = getToken();
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    this._initialize();
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    this._stopPollingData();
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

  _initialize() {
    this._initializeEthers();
    this._startPollingData();
  }

  async _initializeEthers() {
    // We first initialize ethers by creating a provider
    this._provider = new ethers.providers.JsonRpcProvider();

    this._entity = new ethers.Contract(
      this.token,
      EntityArtifact.abi,
      this._provider.getSigner(0)
    );
    console.log("Entity contract:", this._entity);

    const contractsArr = await this._entity.getActiveLicenseeSLs();
    console.log(
      "Associated Manager Contracts: ",
      JSON.stringify(contractsArr, null, 4)
    );

    this._managerArr = new Array();
    for (const _address of contractsArr) {
      this._managerArr.push(
        new ethers.Contract(
          _address,
          ManagerArtifact.abi,
          this._provider.getSigner(0)
        )
      );
    }

    this._getManagerData();
  }

  _startPollingData() {
    this._pollDataInterval = setInterval(() => this._getManagerData(), 100000);
    // this._pollDataIntervalTest = setInterval(() => this._updateEntityData(), 1000);

    // We run it once immediately so we don't have to wait for it
    // this._updateBalance();
  }

  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  _transformManagerLegacyData(data) {
    let transformedData = [];
    if (data.length % 3 != 0) {
      console.log("Invalid array input for legacy data transform.");
    } else {
      for (let i = 0; i < data.length; i++) {
        transformedData.push(parseInt(data[i]._hex, 16));
      }
    }
    return transformedData;
  }

  async _getManagerData() {
    if (this._managerArr.length != 0) {
      let _managerData = [];
      for (const _manager of this._managerArr) {
        let managerAddress = _manager.address;
        let licensee = await _manager.getLicensee();
        let licensor = await _manager.getLicensor();
        let isActive = await _manager.isActive();
        let royaltyData = this._transformManagerLegacyData(
          await _manager.getRoyaltyHistoryLegacyDapp()
        );
        _managerData.push({
          managerAddress,
          licensee,
          licensor,
          isActive,
          royaltyData,
        });
      }
      console.log("aux array:", _managerData);
      this.setState({ managerData: [..._managerData] });
    }
  }

  render() {
    return (
      <div className="wrapper">
        {/* <BrowserRouter> */}
        <Sidebar
          {...this.props}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />

          <Dashboard
            {...this.props}
            managerArr={this.managerArr}
            managerData={this.state.managerData}
            entity={this.entity}
          />
          <PrivateRoute
            path="/royalties"
            {...this.props}
            component={Dashboard}
          />
          <PrivateRoute path="/active-licenses" component={Dashboard} />


          <Footer fluid />
        </div>
        {/* </BrowserRouter> */}
      </div>
    );
  }
}
