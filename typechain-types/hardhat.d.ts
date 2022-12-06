/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "IERC1822ProxiableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822ProxiableUpgradeable__factory>;
    getContractFactory(
      name: "IBeaconUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeaconUpgradeable__factory>;
    getContractFactory(
      name: "ERC1967UpgradeUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967UpgradeUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "UUPSUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UUPSUpgradeable__factory>;
    getContractFactory(
      name: "PausableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableUpgradeable__factory>;
    getContractFactory(
      name: "ReentrancyGuardUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "AccessControlEnumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlEnumerable__factory>;
    getContractFactory(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControl__factory>;
    getContractFactory(
      name: "IAccessControlEnumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlEnumerable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC1822Proxiable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822Proxiable__factory>;
    getContractFactory(
      name: "ERC2771Context",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC2771Context__factory>;
    getContractFactory(
      name: "IBeacon",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeacon__factory>;
    getContractFactory(
      name: "ERC1967Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Proxy__factory>;
    getContractFactory(
      name: "ERC1967Upgrade",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Upgrade__factory>;
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721URIStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721URIStorage__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "MinimalForwarder",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MinimalForwarder__factory>;
    getContractFactory(
      name: "MockToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockToken__factory>;
    getContractFactory(
      name: "Registry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Registry__factory>;
    getContractFactory(
      name: "SimpleExchange",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleExchange__factory>;
    getContractFactory(
      name: "ExchangeCore",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ExchangeCore__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IMintingFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IMintingFactory__factory>;
    getContractFactory(
      name: "AltERC721MintingFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AltERC721MintingFactory__factory>;
    getContractFactory(
      name: "AltERC721NFTContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AltERC721NFTContract__factory>;
    getContractFactory(
      name: "ERC721MintingFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721MintingFactory__factory>;
    getContractFactory(
      name: "ERC721MintingFactoryV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721MintingFactoryV2__factory>;
    getContractFactory(
      name: "ERC721NFTContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721NFTContract__factory>;
    getContractFactory(
      name: "NFTContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTContract__factory>;
    getContractFactory(
      name: "NFTMintingFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTMintingFactory__factory>;
    getContractFactory(
      name: "NFTMintingFactoryV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTMintingFactoryV2__factory>;
    getContractFactory(
      name: "AdminRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AdminRegistry__factory>;
    getContractFactory(
      name: "IAdminRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAdminRegistry__factory>;
    getContractFactory(
      name: "Stakable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Stakable__factory>;
    getContractFactory(
      name: "StakeFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakeFactory__factory>;
    getContractFactory(
      name: "Staking",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Staking__factory>;
    getContractFactory(
      name: "StakingPool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakingPool__factory>;
    getContractFactory(
      name: "StakingProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakingProxy__factory>;
    getContractFactory(
      name: "StakingV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakingV2__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "WETHToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WETHToken__factory>;
    getContractFactory(
      name: "Enoch",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Enoch__factory>;
    getContractFactory(
      name: "Enoch1",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Enoch1__factory>;
    getContractFactory(
      name: "IEnoch1",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IEnoch1__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IPremiumNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPremiumNFT__factory>;
    getContractFactory(
      name: "Love",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Love__factory>;
    getContractFactory(
      name: "NestedNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NestedNFT__factory>;
    getContractFactory(
      name: "PremiumNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PremiumNFT__factory>;
    getContractFactory(
      name: "RjToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RjToken__factory>;
    getContractFactory(
      name: "RWDToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RWDToken__factory>;
    getContractFactory(
      name: "SoulBound",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SoulBound__factory>;

    getContractAt(
      name: "IERC1822ProxiableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822ProxiableUpgradeable>;
    getContractAt(
      name: "IBeaconUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeaconUpgradeable>;
    getContractAt(
      name: "ERC1967UpgradeUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967UpgradeUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "UUPSUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UUPSUpgradeable>;
    getContractAt(
      name: "PausableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableUpgradeable>;
    getContractAt(
      name: "ReentrancyGuardUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "AccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControl>;
    getContractAt(
      name: "AccessControlEnumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlEnumerable>;
    getContractAt(
      name: "IAccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControl>;
    getContractAt(
      name: "IAccessControlEnumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlEnumerable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC1822Proxiable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822Proxiable>;
    getContractAt(
      name: "ERC2771Context",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC2771Context>;
    getContractAt(
      name: "IBeacon",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeacon>;
    getContractAt(
      name: "ERC1967Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967Proxy>;
    getContractAt(
      name: "ERC1967Upgrade",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967Upgrade>;
    getContractAt(
      name: "Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Proxy>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721URIStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721URIStorage>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "MinimalForwarder",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MinimalForwarder>;
    getContractAt(
      name: "MockToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockToken>;
    getContractAt(
      name: "Registry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Registry>;
    getContractAt(
      name: "SimpleExchange",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleExchange>;
    getContractAt(
      name: "ExchangeCore",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ExchangeCore>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IMintingFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IMintingFactory>;
    getContractAt(
      name: "AltERC721MintingFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AltERC721MintingFactory>;
    getContractAt(
      name: "AltERC721NFTContract",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AltERC721NFTContract>;
    getContractAt(
      name: "ERC721MintingFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721MintingFactory>;
    getContractAt(
      name: "ERC721MintingFactoryV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721MintingFactoryV2>;
    getContractAt(
      name: "ERC721NFTContract",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721NFTContract>;
    getContractAt(
      name: "NFTContract",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTContract>;
    getContractAt(
      name: "NFTMintingFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTMintingFactory>;
    getContractAt(
      name: "NFTMintingFactoryV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTMintingFactoryV2>;
    getContractAt(
      name: "AdminRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AdminRegistry>;
    getContractAt(
      name: "IAdminRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAdminRegistry>;
    getContractAt(
      name: "Stakable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Stakable>;
    getContractAt(
      name: "StakeFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakeFactory>;
    getContractAt(
      name: "Staking",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Staking>;
    getContractAt(
      name: "StakingPool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakingPool>;
    getContractAt(
      name: "StakingProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakingProxy>;
    getContractAt(
      name: "StakingV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakingV2>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "WETHToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WETHToken>;
    getContractAt(
      name: "Enoch",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Enoch>;
    getContractAt(
      name: "Enoch1",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Enoch1>;
    getContractAt(
      name: "IEnoch1",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IEnoch1>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IPremiumNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPremiumNFT>;
    getContractAt(
      name: "Love",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Love>;
    getContractAt(
      name: "NestedNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NestedNFT>;
    getContractAt(
      name: "PremiumNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PremiumNFT>;
    getContractAt(
      name: "RjToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RjToken>;
    getContractAt(
      name: "RWDToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RWDToken>;
    getContractAt(
      name: "SoulBound",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SoulBound>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
