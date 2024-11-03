import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_2022_PROGRAM_ID, MINT_SIZE, createInitializeMintInstruction } from "@solana/spl-token";
import { useState } from 'react';

export function TokenLaunchpad() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [message, setMessage] = useState('');

    async function createToken() {
        if (!wallet.connected) {
            console.log("Wallet not connected!");
            return;
        }

        try {
            const mintKeypair = Keypair.generate();
            const lamports = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);

            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    space: MINT_SIZE,
                    lamports,
                    programId: TOKEN_2022_PROGRAM_ID,
                }),
                createInitializeMintInstruction(
                    mintKeypair.publicKey,
                    9, // Number of decimals
                    wallet.publicKey, // Mint authority
                    null, // Freeze authority
                    TOKEN_2022_PROGRAM_ID
                )
            );

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            transaction.partialSign(mintKeypair);

            const txSignature = await wallet.sendTransaction(transaction, connection);
            console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}, Transaction Signature: ${txSignature}`);

            // Construct the message with a link to the explorer
            setMessage(
                <>
                    Token mint created! You can check your token at: 
                    <a 
                        href={`https://explorer.solana.com/address/${mintKeypair.publicKey.toBase58()}?cluster=devnet`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                        {` ${mintKeypair.publicKey.toBase58()}`}
                    </a>
                    <br />
                    Note: Metadata is not included as of now.
                </>
            );
        } catch (error) {
            console.error("Error creating token:", error);
            setMessage("Error creating token. Please check the console for more details.");
        }
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h1>Solana Token Launchpad</h1>
            <input className='inputText' type='text' placeholder='Name' /> <br />
            <input className='inputText' type='text' placeholder='Symbol' /> <br />
            <input className='inputText' type='text' placeholder='Image URL' /> <br />
            <input className='inputText' type='text' placeholder='Initial Supply' /> <br />
            <button onClick={createToken} className='btn'>Create a token</button>
            {message && <p>{message}</p>} {/* Display the message to the user */}
        </div>
    );
}
