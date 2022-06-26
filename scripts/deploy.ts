import { ethers } from 'hardhat'

async function main() {
    // Minting smart contract
    const ContractFactoryERC = await ethers.getContractFactory(
        "Minting"
    );
    const erc20Contract = await ContractFactoryERC.deploy();
    await erc20Contract.deployed();
    console.log("ERC-20 Contract Address: ", erc20Contract.address);

    // Voting smart contract
    const ContractFactoryVoting = await ethers.getContractFactory(
        "Voting"
    );
    const votingContract = await ContractFactoryVoting.deploy();
    await votingContract.deployed();
    console.log("Voting Contract Address: ", votingContract.address);    
    
    // Instance of WorldID contract on the mumbai testnet
    const worldIDAddress = "0xABB70f7F39035586Da57B3c8136035f87AC0d2Aa";
    const ContractFactory = await ethers.getContractFactory('Contract')
    const contract = await ContractFactory.deploy(worldIDAddress)
    await contract.deployed()
    console.log('Contract deployed to:', contract.address)
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
