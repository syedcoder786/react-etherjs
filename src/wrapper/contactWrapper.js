import { ethers } from 'ethers';

import config from "../config/default.json"


// @returns null if provider or wallet absent else the provider

export const connect = () => {
	const { ethereum } = window;
	if (!ethereum) {
		console.log('Error, wallet absent');
		return null;
	}

	const provider = new ethers.providers.Web3Provider(ethereum);

	return provider;
};

// @returns connected and selected user address
export const getUserAddress = async () => {
    const { ethereum } = window;
	const accounts = await ethereum.request({ method: 'eth_accounts' })
	return accounts;
};

// @returns Contract object
export const getContract = () => {


	// const provider = new ethers.providers.Web3Provider(window.ethereum);
	const provider = connect();

	if (!provider) {
		console.log('Provider is null');
		return null;
	}

	const signer = provider.getSigner();
	const contract = new ethers.Contract(config.contAdd, config.contAbi, signer);

	return contract;
};