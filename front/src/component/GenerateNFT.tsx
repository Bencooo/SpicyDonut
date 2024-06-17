import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import metamaskConnect from "./MetamaskConnect";
import NFTFactoryABI from '../artifacts/contracts/NFTFactory.sol/NFTFactory.json';

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const GenerateNFT: React.FC = () => {
    const { signer } = metamaskConnect();
    const [nftName, setNftName] = useState<string>('');

    const generateNFT = async () => {
        if (!signer) return;

        const contract = new ethers.Contract(CONTRACT_ADDRESS, NFTFactoryABI.abi, signer);
        await contract.generateNFT("Nom", "Symbol");
        const name = await contract.getNFTNameById(0);
        setNftName(name);
    };

    return (
        <div>
            <button onClick={generateNFT}>Generate NFT</button>
            {nftName && <div>NFT Name: {nftName}</div>}
        </div>
    );
};

export default GenerateNFT;