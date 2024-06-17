import { useEffect, useState } from 'react';
import { BrowserProvider, ethers } from 'ethers';

declare global {
    interface Window {
        ethereum: any;
    }
}

const MetaMaskConnect = () => {
    const [provider, setProvider] = useState<ethers.BrowserProvider>();
    const [signer, setSigner] = useState<ethers.Signer>();
    const [account, setAccount] = useState<string>();

    useEffect(() => {
        const init = async () => {
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send('eth_requestAccounts', []);

                const signer = await provider.getSigner();
                const account = await signer?.getAddress();

                setProvider(provider);
                setSigner(signer);
                setAccount(account);
                console.log('sign : ', signer);
            }
        };
        init();
    }, []);

    return { provider, signer, account };
};

export default MetaMaskConnect;