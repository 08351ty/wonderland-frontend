import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { IdkTokenContract, MemoTokenContract, MimTokenContract, SaleVault } from "../../abi";
import { setAll } from "../../helpers";

import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import React from "react";
import { RootState } from "../store";
import { IToken } from "../../helpers/tokens";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
    balances: {
        memo: string;
        time: string;
        dai: string;
        depositedDai: string;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const memoContract = new ethers.Contract(addresses.MEMO_ADDRESS, MemoTokenContract, provider);
    const memoBalance = await memoContract.balanceOf(address);
    const timeContract = new ethers.Contract(addresses.TIME_ADDRESS, IdkTokenContract, provider);
    const timeBalance = await timeContract.balanceOf(address);
    const daiContract = new ethers.Contract(addresses.DAI_ADDRESS, IdkTokenContract, provider);
    const daiBalance = await daiContract.balanceOf(address);
    const idoContract = new ethers.Contract(addresses.IDO_ADDRESS, SaleVault, provider);
    const depositedDai = await idoContract.totalUserDeposit(address);

    return {
        balances: {
            memo: ethers.utils.formatUnits(memoBalance, "gwei"),
            time: ethers.utils.formatUnits(timeBalance, "gwei"),
            dai: ethers.utils.formatUnits(daiBalance),
            depositedDai: ethers.utils.formatUnits(depositedDai),
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
    balances: {
        time: string;
        memo: string;
        dai: string;
    };
    staking: {
        time: number;
        memo: number;
        daiIDO: number;
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
    let timeBalance = 0;
    let memoBalance = 0;
    let daiBalance = 0;

    let stakeAllowance = 0;
    let unstakeAllowance = 0;
    let idoAllowance = 0;

    const addresses = getAddresses(networkID);

    if (addresses.TIME_ADDRESS) {
        const timeContract = new ethers.Contract(addresses.TIME_ADDRESS, IdkTokenContract, provider);
        timeBalance = await timeContract.balanceOf(address);
        stakeAllowance = await timeContract.allowance(address, addresses.STAKING_HELPER_ADDRESS);
    }

    if (addresses.MEMO_ADDRESS) {
        const memoContract = new ethers.Contract(addresses.MEMO_ADDRESS, MemoTokenContract, provider);
        memoBalance = await memoContract.balanceOf(address);
        unstakeAllowance = await memoContract.allowance(address, addresses.STAKING_ADDRESS);
    }

    if (addresses.DAI_ADDRESS) {
        const daiContract = new ethers.Contract(addresses.DAI_ADDRESS, IdkTokenContract, provider);
        daiBalance = await daiContract.balanceOf(address);
        idoAllowance = await daiContract.allowance(address, addresses.IDO_ADDRESS);
    }

    return {
        balances: {
            memo: ethers.utils.formatUnits(memoBalance, "gwei"),
            time: ethers.utils.formatUnits(timeBalance, "gwei"),
            dai: ethers.utils.formatUnits(daiBalance),
        },
        staking: {
            time: Number(stakeAllowance),
            memo: Number(unstakeAllowance),
            daiIDO: Number(idoAllowance),
        },
    };
});

interface ICalcUserBondDetails {
    address: string;
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserBondDetails {
    allowance: number;
    balance: number;
    avaxBalance: number;
    interestDue: number;
    bondMaturationBlock: number;
    pendingPayout: number; //Payout formatted in gwei.
}

export const calculateUserBondDetails = createAsyncThunk("account/calculateUserBondDetails", async ({ address, bond, networkID, provider }: ICalcUserBondDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                bond: "",
                displayName: "",
                bondIconSvg: "",
                isLP: false,
                allowance: 0,
                balance: 0,
                interestDue: 0,
                bondMaturationBlock: 0,
                pendingPayout: "",
                avaxBalance: 0,
            });
        });
    }

    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let interestDue, pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);
    interestDue = bondDetails.payout / Math.pow(10, 9);
    bondMaturationBlock = Number(bondDetails.vesting) + Number(bondDetails.lastTime);
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
        balance = "0";

    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    const balanceVal = ethers.utils.formatEther(balance);

    const avaxBalance = await provider.getSigner().getBalance();
    const avaxVal = ethers.utils.formatEther(avaxBalance);

    const pendingPayoutVal = ethers.utils.formatUnits(pendingPayout, "gwei");
    return {
        bond: bond.name,
        displayName: bond.displayName,
        bondIconSvg: bond.bondIconSvg,
        isLP: bond.isLP,
        allowance: Number(allowance),
        balance: Number(balanceVal),
        avaxBalance: Number(avaxVal),
        interestDue,
        bondMaturationBlock,
        pendingPayout: Number(pendingPayoutVal),
    };
});

interface ICalcUserTokenDetails {
    address: string;
    token: IToken;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserTokenDetails {
    allowance: number;
    balance: number;
    isEth?: boolean;
}

export const calculateUserTokenDetails = createAsyncThunk("account/calculateUserTokenDetails", async ({ address, token, networkID, provider }: ICalcUserTokenDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                token: "",
                address: "",
                img: "",
                allowance: 0,
                balance: 0,
            });
        });
    }
    if (token.isEth) {
        const ethBalance = await provider.getSigner().getBalance();
        const ethVal = ethers.utils.formatEther(ethBalance);

        return {
            token: token.name,
            tokenIcon: token.img,
            balance: Number(ethVal),
            isEth: true,
        };
    }

    const addresses = getAddresses(networkID);

    const tokenContract = new ethers.Contract(token.address, MimTokenContract, provider);

    let allowance,
        balance = "0";

    allowance = await tokenContract.allowance(address, addresses.STAKING_ADDRESS);
    balance = await tokenContract.balanceOf(address);

    const balanceVal = Number(balance) / Math.pow(10, token.decimals);
    return {
        token: token.name,
        address: token.address,
        img: token.img,
        allowance: Number(allowance),
        balance: Number(balanceVal),
    };
});

export interface IAccountSlice {
    bonds: { [key: string]: IUserBondDetails };
    balances: {
        memo: string;
        time: string;
        dai: string;
        depositedDai: string;
    };
    loading: boolean;
    staking: {
        time: number;
        memo: number;
        daiIDO: number;
    };
    tokens: { [key: string]: IUserTokenDetails };
}

const initialState: IAccountSlice = {
    loading: true,
    bonds: {},
    balances: { memo: "", time: "", dai: "", depositedDai: "" },
    staking: { time: 0, memo: 0, daiIDO: 0 },
    tokens: {},
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(getBalances.pending, state => {
                state.loading = true;
            })
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserBondDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const bond = action.payload.bond;
                state.bonds[bond] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserTokenDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserTokenDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const token = action.payload.token;
                state.tokens[token] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserTokenDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
