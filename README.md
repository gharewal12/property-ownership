# Property Tracker - Decentralized Property Ownership Tracking

## Overview
Property Tracker is a decentralized application (DApp) that allows users to register, transfer, and view the history of property ownership on the blockchain. This application aims to enhance transparency, reduce fraud, and provide a secure and immutable record of property transactions.

### Features:
- **Register Property**: Users can register new properties on the blockchain.
- **Transfer Ownership**: Transfer ownership of registered properties.
- **Property History**: View the ownership history of any registered property.
- **Smart Contract**: Deployed on the Sepolia Test Network.
- **Frontend**: Built with React (Next.js), integrated with Web3.js for blockchain interaction.
  
## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Blockchain Interaction**: Web3.js, Ethereum Smart Contracts
- **Smart Contract Language**: Solidity
- **Network**: Ethereum (Sepolia Test Network)

## Live Demo
- [Live Demo URL](https://property-tracker-peach.vercel.app/)

## Installation and Setup
``` bash
npm install
```

### Prerequisites
- Node.js
- MetaMask or another Web3 wallet installed in your browser.
  
### Clone the Repository
```bash
git clone https://github.com/gharewal12/property-tracker
cd property-tracker-frontend
```

### Configure Environment Variables
Create a .env file in the root directory and add your smart contract address and any necessary environment variables:
```bash 
REACT_APP_CONTRACT_ADDRESS=your_contract_address
REACT_APP_NETWORK_ID=your_network_id(for sepolia it's 11155111)
```

### Start the Development Server
```bash 
npm run build
```

### Smart Contract
The smart contract is written in Solidity and deployed on the Ethereum Sepolia Test Network. It handles property registration, ownership transfer, and fetching the ownership history.

### Deployment
You can deploy the smart contract using Remix IDE or other Ethereum development frameworks. Ensure you are using the Sepolia Test Network to avoid using real Ether.

### Contract Address and Etherscan
The contract is deployed on Sepolia: [Etherscan Link to the Contract](https://sepolia.etherscan.io/address/0x7c018cd6382516622272624949992d3c7dfa8d4c).

### Smart Contract Methods
- registerProperty(propertyID, location, ownerName, documentHash): Registers a new property on the blockchain.
- transferOwnership(propertyID, newOwnerName, newOwnerAddress): Transfers ownership of a registered property.
- getOwnershipHistory(propertyID): Fetches the ownership history of a given property.

How to Use
- Register Property: Enter the property details (ID, owner name, location, document hash) and submit to register it on the blockchain.
- Transfer Ownership: Input the property ID and new owner details to transfer ownership.
- View Property History: Enter a property ID to see all previous owners and transaction dates.

### Contributing
I welcome contributions to this project. To contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Submit a pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.