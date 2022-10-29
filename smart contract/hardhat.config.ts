import { HardhatUserConfig } from "hardhat/config";
import dotenv from 'dotenv';
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";

dotenv.config();

const PRIVATE_KEY: string = process.env.PRIVATE_KEY ?? '';

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/'+process.env.ALCHEMY_API_KEY,
      accounts: [PRIVATE_KEY],
    }
  }
};

export default config;
