require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_URL="https://eth-sepolia.g.alchemy.com/v2/b9vS1XRL5norjXpaDeW_2XSJBA_-9Nkn";
const PRIVATE_KEY="5a49c9b6a03e62cb79d0376283bbea5c2355d4d198d0163335f571ef179e48ab";
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
        url:SEPOLIA_URL,
       accounts:[PRIVATE_KEY],
    }
  }
};