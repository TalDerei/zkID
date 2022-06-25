import { ethers, waffle } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
import { abi as ABI, bytecode as BYTECODE } from "@openzeppelin/contracts/build/contracts/ERC20PresetFixedSupply.json";

async function main() {
    const [signer] = await ethers.getSigners();
    
    // Deploy ERC-20 minting contract
    let ERC20Contract = await waffle.deployContract(
        signer, {bytecode: BYTECODE, abi: ABI},
        [
            "zkID-Token", 
            "zkID", 
            BigNumber.from(1_000_000),
            signer.address
        ])
    console.log(`ERC-20 Address: ${ERC20Contract.address}`)

    // Deploying ERC-20 implementation contract
     const erc20Contract = await ethers.getContractFactory(
        "Minting"
    );
    const erc20ContractInstance = await erc20Contract.deploy();
    await erc20ContractInstance.deployed();
    console.log("ERC20 Implementation Address:", erc20ContractInstance.address);

    // Transfer ERC-20 to implementation erc-20 contract
    await ERC20Contract.transfer(erc20ContractInstance.address, 1_000_000);
    console.log(`Transfered erc-20 to ${erc20ContractInstance.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })