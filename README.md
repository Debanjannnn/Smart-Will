# Smart-Will

Smart Will is a decentralized platform that allows users to ensure their assets are passed on to their loved ones. Built on the blockchain, this application allows you to securely store your assets, define a recipient, and protect your will from unauthorized access. The assets become accessible to the designated recipient after a period of inactivity, ensuring that your wealth is passed on in case of your absence.

## Features

- **Secure Vault**: Your assets are safely stored in a smart contract.
- **Time Lock**: Assets become accessible to heirs after 10 years of inactivity from the owner.
- **Transparent Transactions**: All transactions are fully visible and verifiable on the blockchain.

## How It Works

1. **Create Your Smart Will**: Deposit funds and specify the recipient.
2. **Stay Active**: Regularly ping the contract to keep your will secure and prevent premature claims.
3. **Claim the Funds**: After 10 years of inactivity, the recipient can claim the stored funds.

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [Solidity Compiler](https://soliditylang.org/) for smart contract compilation and deployment

### Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/Debanjannnn/Will.git
    cd Will
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Compile and deploy the smart contract (assuming you're using a development blockchain like Ganache):

    ```bash
    truffle compile
    truffle migrate
    ```

## Usage

1. **Create a Will**: Call the `createWill` function and provide a recipient address and description. 
2. **Ping the Contract**: Stay active by regularly calling the `ping` function to keep your will secure.
3. **Claim Funds**: After 10 years of inactivity, the recipient can claim the funds using the `claim` function.

### Example:

```js
// Example: Create a Will
smartWill.createWill('0xRecipientAddress', 'Description of assets')
    .then(result => {
        console.log('Will created successfully!', result);
    });

// Example: Ping the contract to keep the will active
smartWill.ping()
    .then(result => {
        console.log('Ping successful!', result);
    });
