import { useState, useEffect } from 'react';
import Web3, { Contract } from 'web3';
import PropertyRegistry from '../contracts/PropertyRegistry.json';
import { useGlobalContext } from '../contexts/GlobalContext';

const usePropertyRegistry = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract<any> | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const { setAlert } = useGlobalContext();

  useEffect(() => {
    let registryContract: Contract<any>;
    const init = async () => {
      const ethereum = (window as any).ethereum;
      if (ethereum) {
        try {
          const web3Instance = new Web3(ethereum);
          setWeb3(web3Instance);

          // Request accounts to connect MetaMask
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
          });
          setAccount(accounts[0]);


          // Check network ID (Sepolia is 11155111)
          const networkId = await web3Instance.eth.net.getId();
          if (Number(networkId).toString() == process.env.REACT_APP_NETWORK_ID) {
            // Set the contract with the Sepolia network address
            registryContract = new web3Instance.eth.Contract(
              PropertyRegistry.abi,
              process.env.REACT_APP_DEPLOYED_CONTRACT_ADDRESS
            );
            setContract(registryContract);
          }
          else {
            setAlert({
              open: true,
              severity: 'warning',
              message: 'Please connect to the Sepolia test network!'
            });
          }
        } catch (error) {
          setAlert({
            open: true,
            severity: 'error',
            message: 'Error connecting to MetaMask'
          });
        }

        //Watch Events
        if (registryContract && registryContract.events) {
          registryContract?.events.allEvents().on('data', (event) => {
            const { event: eventName, returnValues } = event;

            switch (eventName) {
              case 'PropertyRegistered':
                // console.log('Property Registered:', returnValues);
                break;
              case 'OwnershipTransferred':
                // console.log('Ownership Transferred:', returnValues);
                break;
              default:
                // console.log('Other Event:', eventName, returnValues);
            }
          });
        }
      }
      else {
        setAlert({
          open: true,
          severity: 'warning',
          message: 'MetaMask is not installed! Please install MetaMask to interact with the application.'
        });
      }
    };

    init();
  }, []);

  // Event listener to handle MetaMask account change
  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });

      ethereum.on('chainChanged', () => {
        // Reload the page when the network changes
        window.location.reload();
      });
    }
  }, []);

  return { web3, contract, account };
};

export default usePropertyRegistry;
