import { ethers } from 'hardhat'

async function main() {
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
