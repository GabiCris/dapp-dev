import React from "react";

// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import ManagerArtifact from "../contracts/ManagerContract.json";
import EntityArtifact from "../contracts/EntityContract.json";
import { getToken, removeUserSession } from "../utils/Common";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PaymentIcon from "@material-ui/icons/Payment";
import { RoyaltiesPaymentPie } from "./graphs/RoyaltiesPaymentPie.js";
import { RoyaltySlGraphLine } from "./graphs/RoyaltySLGraphLine";
import { CumulativeRoyaltyGraph } from "./graphs/CumulativeRoyaltyGraph";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.token = getToken();
    // We store multiple things in Dapp's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      entity: undefined,
      managerData: [],
    };

    this.state = this.initialState;
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    // const listItems = this.state.managerData.map((item) =>  <li>{item.licensee}</li>);
    let royaltiesSumPaid = this._getRoyaltiesSum(1);
    let royaltiesSumUnpaid = this._getRoyaltiesSum(0);
    return (
      <>
        <div className="content">
          <Row className="justify-content-md-center">
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <AccountBalanceWalletIcon
                          fontSize="large"
                          style={{ color: "#51cbce" }}
                        />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Unpaid Royalties</p>
                        <CardTitle tag="p">$ {royaltiesSumUnpaid}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> See Royalties Due For
                    Payment
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <PaymentIcon
                          fontSize="large"
                          style={{ color: "#51cbce" }}
                        />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Paid Royalties</p>
                        <CardTitle tag="p">$ {royaltiesSumPaid}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Go To Transaction History
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <AccountBalanceIcon
                          fontSize="large"
                          style={{ color: "#51cbce" }}
                        />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Active Smart Licenses</p>
                        <CardTitle tag="p">
                          {this.props.managerData.length}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> See Related Smart Licenses
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          {/* GRAPH ROW FOLLOWING HERE: */}
          <>
            <Row>
              <Col md="5">
                <Card className="chart">
                  <CardHeader>
                    <CardTitle tag="h5">Unpaid Royalties</CardTitle>
                    <p className="card-category">
                      Grouped by Active Smart Licenses (values in $)
                    </p>
                  </CardHeader>
                  <CardBody style={{ height: 400 }}>
                    {/* <div style={{height: 200}}> */}
                    <RoyaltiesPaymentPie data={this.props.managerData} />
                    {/* </div> */}
                  </CardBody>
                </Card>
              </Col>
              <Col md="7">
                <Card className="chart">
                  <CardHeader>
                    <CardTitle tag="h5">Royalties Timeline</CardTitle>
                    <p className="card-category">
                      Paid and Unpaid Royalties by Active Smart Licenses
                    </p>
                  </CardHeader>
                  <CardBody style={{ height: 400 }}>
                    <RoyaltySlGraphLine data={this.props.managerData} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card className="chart">
                  <CardHeader>
                    <CardTitle tag="h5">Cumulative Royalties Payments</CardTitle>
                    <p className="card-category">
                      Grouped by Royalty Issue Date
                    </p>
                  </CardHeader>
                  <CardBody style={{ height: 400 }}>
                    {/* <div style={{height: 200}}> */}
                    <CumulativeRoyaltyGraph data={this.props.managerData} />
                    {/* </div> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        </div>
      </>
    );
  }

  handleLogout() {
    removeUserSession();
    this.props.history.push("/login");
  }

  componentDidMount() {
    // this._initialize();
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

  async _updateManagerData() {}

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

  _getRoyaltiesSum(flag) {
    let roy = 0;
    if (this.props.managerData.length != 0) {
      for (const managerData of this.props.managerData) {
        for (let i = 0; i < managerData.royaltyData.length - 2; i = i + 3) {
          if (managerData.royaltyData[i + 2] === flag) {
            roy += managerData.royaltyData[i];
          }
        }
      }
    }
    return roy;
  }
  // This method resets the state
}

export default Dashboard;
