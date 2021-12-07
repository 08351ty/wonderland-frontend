import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import DaiEIcon from "../../assets/tokens/DAI.e.png";
import UsdcEIcon from "../../assets/tokens/USDC.e.png";
import AvaxIcon from "../../assets/tokens/AVAX.svg";
import MimTimeIcon from "../../assets/tokens/TIME-MIM.svg";
import AvaxTimeIcon from "../../assets/tokens/TIME-AVAX.svg";

import { StableBondContract, LpBondContract, StableReserveContract, LpReserveContract } from "../../abi";

export const dai = new StableBond({
    name: "dai",
    displayName: "DAI",
    bondToken: "DAI",
    bondIconSvg: DaiEIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.BOBATEST]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0xADc3967dd622A2254D2c4a98bc593c620365903d",
        },
        [Networks.BOBA]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0xADc3967dd622A2254D2c4a98bc593c620365903d",
        },
        [Networks.ETHRINKEBY]: {
            bondAddress: "0x4aD084Bc712855361571cD10C157d960D0d7Bdd1",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
    },
    //tokensInStrategy: "60500000000000000000000000",
});

export const usdc = new StableBond({
    name: "usdc",
    displayName: "USDC",
    bondToken: "USDC",
    bondIconSvg: UsdcEIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.BOBATEST]: {
            bondAddress: "0xB24898De59C8E259F9742bCF2C16Fd613DCeA8F7",
            reserveAddress: "0xADc3967dd622A2254D2c4a98bc593c620365903d",
        },
        [Networks.BOBA]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
        [Networks.ETHRINKEBY]: {
            bondAddress: "0x4aD084Bc712855361571cD10C157d960D0d7Bdd1",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
    },
    //tokensInStrategy: "60500000000000000000000000",
});

//don't need this
/*
export const wavax = new CustomBond({
    name: "wavax",
    displayName: "wAVAX",
    bondToken: "AVAX",
    bondIconSvg: AvaxIcon,
    bondContractABI: WavaxBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
            reserveAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
        },
        [Networks.BOBATEST]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
        [Networks.BOBA]: {
            bondAddress: "0x694738E0A438d90487b4a549b201142c1a97B556",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});


//don't need this
export const mimTime = new LPBond({
    name: "mim_time_lp",
    displayName: "TIME-MIM LP",
    bondToken: "MIM",
    bondIconSvg: MimTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0xA184AE1A71EcAD20E822cB965b99c287590c4FFe",
            reserveAddress: "0x113f413371fc4cc4c9d6416cf1de9dfd7bf747df",
        },
        [Networks.BOBATEST]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
        [Networks.BOBA]: {
            bondAddress: "0x694738E0A438d90487b4a549b201142c1a97B556",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

//dont' need this
export const avaxTime = new CustomLPBond({
    name: "avax_time_lp",
    displayName: "TIME-AVAX LP",
    bondToken: "AVAX",
    bondIconSvg: AvaxTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0xc26850686ce755FFb8690EA156E5A6cf03DcBDE1",
            reserveAddress: "0xf64e1c5B6E17031f5504481Ac8145F4c3eab4917",
        },
        [Networks.BOBATEST]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
        [Networks.BOBA]: {
            bondAddress: "0x694738E0A438d90487b4a549b201142c1a97B556",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/AVAX/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});
*/
export default [dai, usdc];
