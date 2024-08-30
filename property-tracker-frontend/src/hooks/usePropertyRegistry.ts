import {useState, useEffect} from 'react';
import Web3, { Contract } from 'web3';
import PropertyRegistry from '../contracts/PropertyRegistry.json';

const usePropertyRegistry = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract<any> | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const ethereum = (window as any).ethereum;
      if (ethereum) {
        const web3Instance = new Web3(ethereum);
        setWeb3(web3Instance);

        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);

        const networkId = await web3Instance.eth.net.getId();
        const networkIdString = networkId.toString();
        const deployedNetwork = (
          PropertyRegistry.networks as {[key: string]: any}
        )[networkIdString];
        const registryContract = new web3Instance.eth.Contract(
          PropertyRegistry.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(registryContract);
      }
    };

    init();
  }, []);

  return {web3, contract, account};
};

export default usePropertyRegistry;
