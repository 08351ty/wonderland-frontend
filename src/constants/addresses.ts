import { Networks } from "./blockchain";

const AVAX_MAINNET = {
    DAO_ADDRESS: "0x78a9e536EBdA08b5b9EDbE5785C9D1D50fA3278C",
    MEMO_ADDRESS: "0x136Acd46C134E8269052c62A67042D6bDeDde3C9",
    TIME_ADDRESS: "0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
    MIM_ADDRESS: "0x130966628846BFd36ff31a822705796e8cb8C18D",
    STAKING_ADDRESS: "0x4456B87Af11e87E329AB7d7C7A246ed1aC2168B9",
    STAKING_HELPER_ADDRESS: "0x096BBfB78311227b805c968b070a81D358c13379",
    TIME_BONDING_CALC_ADDRESS: "0x819323613AbC79016f9D2443a65E9811545382a5",
    TREASURY_ADDRESS: "0x1c46450211CB2646cc1DA3c5242422967eD9e04c",
    ZAPIN_ADDRESS: "0x9ABE63C5A2fBcd54c8bAec3553d326356a530cae", //"0xb98007C04f475022bE681a890512518052CE6104",
    WMEMO_ADDRESS: "0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b",
};

const BOBA_TESTNET = {
    DAO_ADDRESS: "0x53a5ffF35d9D0F1456AcC955E5336e359d4F39b4",
    MEMO_ADDRESS: "0xADc3967dd622A2254D2c4a98bc593c620365903d",
    TIME_ADDRESS: "0xC06FF450f3c0538603e9100F013a12aA38b97825",
    DAI_ADDRESS: "0x0630f97C8938051a44b0A64e9D4d484295393Fe4",
    STAKING_ADDRESS: "0x6f5e5c5e1C9C3362CB0319B34e6ea8Da4563f55D",
    STAKING_HELPER_ADDRESS: "0x4aD084Bc712855361571cD10C157d960D0d7Bdd1",
    TIME_BONDING_CALC_ADDRESS: "0xf94D642e534fee6b919E52F275ca355AA58fcB8d",
    TREASURY_ADDRESS: "0xA0dFA7F5AAb9174dAc914699b9DbaAbd910aB4aD",
    ZAPIN_ADDRESS: "0x9ABE63C5A2fBcd54c8bAec3553d326356a530cae", //"0xb98007C04f475022bE681a890512518052CE6104",
    WMEMO_ADDRESS: "0xADc3967dd622A2254D2c4a98bc593c620365903d",
};

const BOBA_MAINNET = {
    //to be modified
    DAO_ADDRESS: "0x78a9e536EBdA08b5b9EDbE5785C9D1D50fA3278C",
    MEMO_ADDRESS: "0x5543Da0710Bccd0018c32Ffb7E6aCF73FA70DeA7",
    TIME_ADDRESS: "0x3c045839F396096F68686beD201b83eed258F100",
    DAI_ADDRESS: "0x0630f97C8938051a44b0A64e9D4d484295393Fe4",
    STAKING_ADDRESS: "0xF8B52421B4fe39046A7B406b7A3ddb075024CB4f",
    STAKING_HELPER_ADDRESS: "0x647d828993B6f28fAd0772036fCa9E55d3e0B984",
    TIME_BONDING_CALC_ADDRESS: "0xcaaA6a2d4B26067a391E7B7D65C16bb2d5FA571A",
    TREASURY_ADDRESS: "0x64b1D55A59A74b25038Cb7b5215864a90455d10B",
    ZAPIN_ADDRESS: "0x9ABE63C5A2fBcd54c8bAec3553d326356a530cae", //"0xb98007C04f475022bE681a890512518052CE6104",
    WMEMO_ADDRESS: "0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b",
};

const ETH_RINKEBY = {
    DAO_ADDRESS: "0x78a9e536EBdA08b5b9EDbE5785C9D1D50fA3278C",
    MEMO_ADDRESS: "0xf0eBd5E9558cb9d4238d95cfdBf45D93197817AA",
    TIME_ADDRESS: "0x1A064A39054967114ECeB2Aaa56844eC6932651f",
    DAI_ADDRESS: "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D",
    STAKING_ADDRESS: "0xB0c14b3A3ed71194b1E5dc0775e8235727ad85fc",
    STAKING_HELPER_ADDRESS: "0xbce7d5566a7b49Af25CB07DCD8008AF4F790A8fE",
    TIME_BONDING_CALC_ADDRESS: "0x46678671f5Ab1C718686f0d6eFDADe42E04CC805",
    TREASURY_ADDRESS: "0x2174041b327dA95E4404fA49Ccfcb10f4D7fd994",
    ZAPIN_ADDRESS: "0x9ABE63C5A2fBcd54c8bAec3553d326356a530cae", //"0xb98007C04f475022bE681a890512518052CE6104",
    WMEMO_ADDRESS: "0xf0eBd5E9558cb9d4238d95cfdBf45D93197817AA",
};

export const getAddresses = (networkID: number) => {
    //if (networkID === Networks.AVAX) return AVAX_MAINNET;
    if (networkID === Networks.BOBATEST) return BOBA_TESTNET;
    else if (networkID === Networks.BOBA) return BOBA_MAINNET;
    else if (networkID === Networks.ETHRINKEBY) return ETH_RINKEBY;

    throw Error("Network not supported");
};
