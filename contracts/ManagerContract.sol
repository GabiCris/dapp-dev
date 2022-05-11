// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Aggregator.sol";
import "./RoyaltyComputation.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface Manager {
    function updateAggregator(address) external;

    function updateRoyaltyComputation(address) external;

    // uint arr n*3 [(timestamp, royalty, boolean)]
    function getRoyaltyHistoryLegacyDapp() external returns (uint256[] memory);

    function getLicensee() external view returns (address);
    function getLicensor() external view returns (address);
    function isActive() external view returns (bool);

}

// add expiration boolean or date
contract ManagerContract is Manager, Ownable {
    Aggregator aggregator;
    RoyaltyComputation royaltyComputation;
    uint256 public immutable creationDate;
    address public licensee;
    address public licensor;
    bool public active;
    uint256 public expirationDate;

    constructor(
        address _aggregator,
        address _royaltyComputation,
        address _licensee,
        address _licensor,
        uint256 _expirationDate
    ) {
        aggregator = Aggregator(_aggregator);
        royaltyComputation = RoyaltyComputation(_royaltyComputation);
        licensor = _licensor;
        licensee = _licensee;
        creationDate = block.timestamp;
        active = true;
        expirationDate = _expirationDate;
    }

    function updateAggregator(address _aggregator) public override onlyOwner {
        aggregator = Aggregator(_aggregator);
    }

    function updateRoyaltyComputation(address _royaltyComputation)
        public
        override
        onlyOwner
    {
        royaltyComputation = RoyaltyComputation(_royaltyComputation);
    }

    // test input for dapp, format [royalty, time, bool]
    function getRoyaltyHistoryLegacyDapp()
        external
        override
        returns (uint256[] memory)
    {
        uint256[] memory hist = new uint256[](4);
        uint256 a = 0;
        hist[0] =
            uint256(
                keccak256(abi.encodePacked(block.difficulty, address(this)))
            ) %
            10000;
        hist[1] = block.timestamp;
        hist[2] =
            uint256(keccak256(abi.encodePacked(block.difficulty, hist[0]))) %
            10000;
        hist[3] = block.timestamp + 10000;
        return hist;
    }

    function terminateSL() external {
        require(block.timestamp > expirationDate, "SL not expired yet!");
        active = false;
    }

    function getLicensee() external override view returns (address) {
        return licensee;
    }

    function setLicensee(address _licensee) external {
        licensee = _licensee;
    }

    function getLicensor() external override view returns (address) {
        return licensor;
    }

    function isActive() external override view returns (bool) {
        return active;
    }
}