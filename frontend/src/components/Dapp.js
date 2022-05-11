import React from "react";

import { Switch, NavLink, BrowserRouter } from 'react-router-dom';
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
            <NavLink exact activeClassName="active" to="/">Home | </NavLink>
            <NavLink activeClassName="active" to="/login">Login | </NavLink>
            <NavLink activeClassName="active" to="/dashboard">Dashboard </NavLink>
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

  // componentWillUnmount() {
  //   // We poll the user's balance, so we have to stop doing that when Dapp
  //   // gets unmounted
  //   this._stopPollingData();
  // }

  // async _connectWallet() {
  //   // This method is run when the user clicks the Connect. It connects the
  //   // dapp to the user's wallet, and initializes it.

  //   // To connect to the user's wallet, we have to run this method.
  //   // It returns a promise that will resolve to the user's address.
  //   const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

  //   // Once we have the address, we can initialize the application.

  //   // First we check the network
  //   if (!this._checkNetwork()) {
  //     return;
  //   }

  //   this._initialize(selectedAddress);

  //   // We reinitialize it whenever the user changes their account.
  //   window.ethereum.on("accountsChanged", ([newAddress]) => {
  //     this._stopPollingData();
  //     // `accountsChanged` event can be triggered with an undefined newAddress.
  //     // This happens when the user removes the Dapp from the "Connected
  //     // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
  //     // To avoid errors, we reset the dapp state 
  //     if (newAddress === undefined) {
  //       return this._resetState();
  //     }
      
  //     this._initialize(newAddress);
  //   });
    
  //   // We reset the dapp state if the network is changed
  //   window.ethereum.on("chainChanged", ([networkId]) => {
  //     this._stopPollingData();
  //     this._resetState();
  //   });
  // }

  // _initialize(userAddress) {
  //   // This method initializes the dapp

  //   // We first store the user's address in the component's state
  //   this.setState({
  //     selectedAddress: userAddress,
  //   });

  //   // Then, we initialize ethers, fetch the token's data, and start polling
  //   // for the user's balance.

  //   // Fetching the token data and the user's balance are specific to this
  //   // sample project, but you can reuse the same initialization pattern.
  //   this._initializeEthers();
  //   this._getTokenData();
  //   this._getManagerData();
  //   this._getEntityData();
  //   this._getEntityArrData();
  //   this._startPollingData();
  // }

  // async _initializeEthers() {
  //   // We first initialize ethers by creating a provider using window.ethereum
  //   this._provider = new ethers.providers.Web3Provider(window.ethereum);

  //   // Then, we initialize the contract using that provider and the token's
  //   // artifact. You can do this same thing with your contracts.
  //   this._token = new ethers.Contract(
  //     contractAddress.Token,
  //     TokenArtifact.abi,
  //     this._provider.getSigner(0)
  //   );

  //   this._manager = new ethers.Contract(
  //     contractAddress.Manager,
  //     ManagerArtifact.abi,
  //     this._provider.getSigner(0)
  //   );

  //   this._entity = new ethers.Contract(
  //     contractAddress.Entity[0],
  //     EntityArtifact.abi,
  //     this._provider.getSigner(0)
  //   );
  //   console.log("token", this._token);
  //   console.log("entit", this._entity);

  //   this._entityArr = new Array();
  //   for (const _address of contractAddress.Entity) {
  //     this._entityArr.push(new ethers.Contract(
  //       _address,
  //       EntityArtifact.abi,
  //       this._provider.getSigner(0)
  //     ));
  //   }
  // }

  // // The next two methods are needed to start and stop polling data. While
  // // the data being polled here is specific to this example, you can use this
  // // pattern to read any data from your contracts.
  // //
  // // Note that if you don't need it to update in near real time, you probably
  // // don't need to poll it. If that's the case, you can just fetch it when you
  // // initialize the app, as we do with the token data.
  // _startPollingData() {
  //   this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);
  //   this._pollDataIntervalTest = setInterval(() => this._updateEntityData(), 1000);

  //   // We run it once immediately so we don't have to wait for it
  //   this._updateBalance();
  // }

  // _stopPollingData() {
  //   clearInterval(this._pollDataInterval);
  //   this._pollDataInterval = undefined;
  // }

  // // The next two methods just read from the contract and store the results
  // // in the component state.
  // async _getTokenData() {
  //   console.log("mana", this._manager);
  //   const name = await this._token.name();
  //   const symbol = await this._token.symbol();

  //   this.setState({ tokenData: { name, symbol } });
  // }

  // async _getManagerData() {
  //   // const licensee = await this._manager.getLicensee();
  //   // const licensor = await this._manager.getLicensor();
  //   // const creationDate = await this._manager.isActive();

  //   // this.setState({managerData: {licensee, licensor, creationDate}});
  // }

  // async _getEntityData() {
  //   console.log("ENTITY ARRAY ", this._entityArr);
  //   const name = await this._entity.name();
  //   this.setState({entity: name});
  // }

  // async _getEntityArrData() {
  //   let _entityData = [];
  //   for (const enitityContr of this._entityArr) {
  //     let _name = await this._entity.name();
  //     _entityData.push({address: enitityContr.address, name:_name});
  //   }
  //   console.log("aux array:", _entityData);
  //   this.setState({entityData: [..._entityData]});
  // }


  // // This method resets the state
  // _resetState() {
  //   this.setState(this.initialState);
  // }


}


