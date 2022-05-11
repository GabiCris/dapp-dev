// function Dashboard(props) {
//     const token = getToken();

//     const handleLogout = () => {
//         removeUserSession();
//         props.history.push('/login');
//     }

//   return (
//     <div>
//       Welcome User! {token}<br /><br />
//       <input type="button" onClick={handleLogout} value="Logout" />
//     </div>
//   );
// }

import React from "react";

// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import TokenArtifact from "../contracts/Token.json";
import ManagerArtifact from "../contracts/ManagerContract.json";
import EntityArtifact from "../contracts/EntityContract.json";
import contractAddress from "../contracts/contract-address.json";
import { getToken, removeUserSession } from "../utils/Common";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicTable from "./BasicTable";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.token = getToken();
    // We store multiple things in Dapp's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      // The info of the token (i.e. It's Name and symbol)
      tokenData: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: undefined,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      managerData: undefined,
      entity: undefined,
      managerData: [],
    };

    this.state = this.initialState;
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    // const listItems = this.state.managerData.map((item) =>  <li>{item.licensee}</li>);
    return (
      <div>
        Entity Contract address: {this.token}
        <br />
        <br />
        {/* <ul>{listItems}</ul> */}
        <input type="button" onClick={this.handleLogout} value="Logout" />
      </div>
    );
  }

  handleLogout() {
    removeUserSession();
    this.props.history.push("/login");
  }

  componentDidMount() {
    this._initialize();
  }

  componentWillUnmount() {
    // We poll the user's balance, so we have to stop doing that when Dapp
    // gets unmounted
    this._stopPollingData();
  }

  async _connectWallet() {
    this._initialize();
  }

  _initialize() {
    this._initializeEthers();
    // this._getManagerData();
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
    this._pollDataInterval = setInterval(() => this._getManagerData(), 10000);
    // this._pollDataIntervalTest = setInterval(() => this._updateEntityData(), 1000);

    // We run it once immediately so we don't have to wait for it
    // this._updateBalance();
  }

  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  async _getManagerData() {
    if (this._managerArr.length != 0) {
      let _managerData = [];
      for (const _manager of this._managerArr) {
        let licensee = await _manager.getLicensee();
        let licensor = await _manager.getLicensor();
        let isActive = await _manager.active();
        _managerData.push({ licensee, licensor, isActive });
      }
      console.log("aux array:", _managerData);
      this.setState({ managerData: [..._managerData] });
    }
  }

  async _updateManagerData() {
    // console.log("ENTITY ARRAY ", this._entityArr);
    // const name = await this._entity.name();
    // this.setState({entity: name});
  }

  async _getEntityArrData() {
    // let _entityData = [];
    // for (const enitityContr of this._entityArr) {
    //   let _name = await this._entity.name();
    //   _entityData.push({address: enitityContr.address, name:_name});
    // }
    // console.log("aux array:", _entityData);
    // this.setState({entityData: [..._entityData]});
  }

  async _updateEntityData() {}

  // This method resets the state
  _resetState() {
    this.setState(this.initialState);
  }
}

export default Dashboard;
