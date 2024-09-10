import { VersionedTransaction, Connection, Keypair } from '@solana/web3.js';
import bs58 from "bs58";
import { logColor } from 'quickcolor';
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const asciiArt = 
`                                  
 _____             _____               
|   __|___ ___ ___| __  |_ _ _____ ___ 
|   __|  _| -_| -_| __ -| | |     | . |
|__|  |_| |___|___|_____|___|_|_|_|  _|
                                  |_|  
Free pump.fun bumper! - By @jaycooking
`;

const RPC_ENDPOINT = process.env.RPC_ENDPOINT;
const TOKEN_MINT = process.env.TOKEN_MINT;
const web3Connection = new Connection(
    RPC_ENDPOINT,
    'confirmed',
);

// Delay function 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendPortalTransaction(action, tokenMint, amount) {
    const response = await fetch(`https://pumpportal.fun/api/trade-local`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "publicKey": process.env.WALLET_PUBLIC_KEY,  // Your wallet public key from .env
            "action": action,                    // "buy" or "sell"
            "mint": tokenMint,                   // contract address of the token you want to trade
            "denominatedInSol": "false",         // "true" if amount is SOL, "false" if amount is number of tokens
            "amount": amount,                    // amount of SOL or tokens
            "slippage": 10,                      // percent slippage allowed
            "priorityFee": 0.00001,              // priority fee
            "pool": "pump"                       // exchange to trade on. "pump" or "raydium"
        })
    });

    if (response.status === 200) { // successfully generated transaction
        const data = await response.arrayBuffer();
        const tx = VersionedTransaction.deserialize(new Uint8Array(data));
        const signerKeyPair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY));
        tx.sign([signerKeyPair]);
        const signature = await web3Connection.sendTransaction(tx);
        logColor(`Transaction (${action}): https://solscan.io/tx/${signature}`, 'green');  
    } else {
        logColor(`Error (${action}): ${response.statusText}`, 'red');  
    }
}

// The bot logic
async function bumpBot(amount) {
    while (true) { // Infinite loop
        try {
            logColor("Buying...", 'green');
            await sendPortalTransaction("buy", TOKEN_MINT, amount);

            logColor("Selling...", 'red');
            await sendPortalTransaction("sell", TOKEN_MINT, amount);

            await delay(5000); // 5 second delay, adjust as needed
        } catch (error) {
            logColor("Error in bump bot: " + error, 'red');
        }
    }
}


logColor(asciiArt, 'blue');
const amount = 9999;

bumpBot(amount);
