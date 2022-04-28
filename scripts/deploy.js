// This is a script for deploying your contracts. You can adapt it to deploy

const { ethers } = require("hardhat");

// yours, or create new ones.
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());
    const testAdr = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    const Manager = await ethers.getContractFactory("ManagerContract");
    const manager = await Manager.deploy(testAdr, testAdr, testAdr, testAdr, 1000);
    await manager.deployed();

    const EntityContract = await ethers.getContractFactory("EntityContract");
    const entityContract1 = await EntityContract.deploy("ENTITY V1");
    await entityContract1.deployed();
    const entityContract2 = await EntityContract.deploy("ENTITY V2");
    await entityContract2.deployed();


    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(token);
    // saveFrontendFiles(manager);
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.appendFileSync(
        contractsDir + "/contract-address.json",
        JSON.stringify({ Manager: manager.address }, undefined, 2)
    );
    fs.appendFileSync(
        contractsDir + "/contract-address.json",
        JSON.stringify({ Entity: [entityContract1.address, entityContract2.address] }, undefined, 2)
    );

    const EntityArtifact = artifacts.readArtifactSync("EntityContract");
    const ManagerArtifact = artifacts.readArtifactSync("Manager");
    fs.writeFileSync(
        contractsDir + "/Manager.json",
        JSON.stringify(ManagerArtifact, null, 2)
    );
    fs.writeFileSync(
        contractsDir + "/EntityContract.json",
        JSON.stringify(EntityArtifact, null, 2)
    );
}

function saveFrontendFiles(token) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/contract-address.json",
        JSON.stringify({ Token: token.address }, undefined, 2)
    );

    const TokenArtifact = artifacts.readArtifactSync("Token");

    fs.writeFileSync(
        contractsDir + "/Token.json",
        JSON.stringify(TokenArtifact, null, 2)
    );
}

function saveFrontendFilesDapp(contract, contractName) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/contract-address.json",
        JSON.stringify({ Token: token.address }, undefined, 2)
    );

    const TokenArtifact = artifacts.readArtifactSync("Token");

    fs.writeFileSync(
        contractsDir + "/Token.json",
        JSON.stringify(TokenArtifact, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });