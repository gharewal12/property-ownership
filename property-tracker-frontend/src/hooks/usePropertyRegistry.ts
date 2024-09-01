import {useState, useEffect} from 'react';
import Web3, {Contract} from 'web3';
import PropertyRegistry from '../contracts/PropertyRegistry.json';

const usePropertyRegistry = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract<any> | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    let registryContract: Contract<any>;
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

        registryContract = new web3Instance.eth.Contract(
          PropertyRegistry.abi,
          deployedNetwork?.address
        );
        setContract(registryContract);

        //Watch Events
        if (registryContract && registryContract.events) {
          registryContract?.events.allEvents().on('data', (event) => {
            const {event: eventName, returnValues} = event;

            switch (eventName) {
              case 'PropertyRegistered':
                console.log('Property Registered:', returnValues);
                break;
              case 'OwnershipTransferred':
                console.log('Ownership Transferred:', returnValues);
                break;
              default:
                console.log('Other Event:', eventName, returnValues);
            }
          });
        }
      }
    };

    init();
  }, []);

  return {web3, contract, account};
};

export default usePropertyRegistry;
