Solana Token Launchpad
A React-based token creation interface that allows users to create Solana tokens without metadata. Built with @solana/web3.js and @solana/spl-token, this application enables users to connect their wallets, input token details, and launch a new token on the Solana blockchain.

Features
Wallet Connection: Connect with Solana wallets through @solana/wallet-adapter-react.
Token Creation: Users can define a token name, symbol, initial supply, and image URL, and mint the token directly.
Token Account Creation: Automatically creates an associated token account for the user's wallet.
Initial Supply Minting: Mints the specified initial supply to the associated token account.
Explorer Link: Provides a link to view the token on the Solana Explorer after creation.
Prerequisites
Node.js and npm installed
A Solana wallet (e.g., Phantom, Solflare) installed and set up
A Solana devnet or mainnet connection
Installation
Clone this repository:

bash
Copy code
git clone https://github.com/senthan-07/TokenLaunchPad.git
cd TokenLaunchPad
Install the dependencies:

bash
Copy code
npm install
Configuration
Solana Wallet Adapter: Make sure you have the Solana Wallet Adapter set up in your browser to allow wallet connections.

Network Configuration: By default, the code is set to use the Solana devnet. You can configure this to mainnet in the useConnection hook in your code.

Usage
Start the Application:

bash
Copy code
npm start
Connect Wallet:

Click "Connect Wallet" to authorize the application with your Solana wallet.
Fill in Token Details:

Token Name: The name of the token to be created.
Token Symbol: The symbol of the token (e.g., "SOLT").
Image URL: (Optional) URL for an image that represents the token.
Initial Supply: Initial supply of the token, specified in whole units.
Create Token:

Click "Create Token" after entering the details. A new token will be created, and the initial supply will be minted into the user's wallet's associated token account.
View on Solana Explorer:

Once created, a link will be provided to view the token on the Solana Explorer based on the token's mint address.
Project Structure
src/components/TokenLaunchpad.js: Main component handling token creation, wallet connection, and Solana transactions.
@solana/web3.js and @solana/spl-token libraries: Handle Solana blockchain interactions and token instructions.
Example Code
This application uses the following steps to create a token:

Create a Mint Account: Generates a new keypair for the token and initializes it with the Solana token program.
Initialize the Mint: Sets the mint authority and token supply.
Create Associated Token Account: Creates an associated token account for the user's wallet.
Mint Initial Supply: Mints the specified initial supply of tokens into the user's associated token account.
Dependencies
@solana/web3.js: Solana SDK for JavaScript
@solana/spl-token: Token program utilities
@solana/wallet-adapter-react: Wallet connection and management
License
This project is open-source and available under the MIT License.

Note
Ensure to test token creation on Solana’s devnet before deploying on mainnet. Transaction costs on mainnet will incur real SOL fees.

