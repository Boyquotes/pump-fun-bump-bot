# pump.fun Bump Bot

**A Bump Bot** is an automated bot for Solana tokens. It performs a buy action followed by an instant sell, executing quick "bumps" in token trading. The bot is designed to get you're token to the front page!
___
![Bump Bot](https://i.imgur.com/oblDm1T.png)

## Features

- **Automated Buy-Sell**: Instantly buys and sells tokens in sequence.
- **Easy Configuration**: Set up all important variables in a `.env` file.
- **Quick Setup**: Simple installation and minimal configuration.

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure the Bot**: Set up the `.env` file with your Solana wallet details and token information.

3. **Run the Bot**:
   ```bash
   node index.mjs
   ```

## Configuration

The bot is configured through a `.env` file:

```plaintext
RPC_ENDPOINT=https://your.rpc.endpoint
TOKEN_MINT=your_token_mint_address
WALLET_PUBLIC_KEY=your_wallet_public_key
PRIVATE_KEY=your_wallet_private_key
```

### Key Settings

- **RPC_ENDPOINT**: The RPC endpoint for Solana.
- **TOKEN_MINT**: The contract address of the token you wish to trade.
- **WALLET_PUBLIC_KEY**: Your wallet's public key.
- **PRIVATE_KEY**: Your wallet's private key for signing transactions.

## Future Updates

⭐ **5 stars**: Add multiple bot's  
⭐ **10 stars**: Simple Dashboard with real-time monitoring 
⭐ **30 stars**: Direct buy/sell without an api  

## 🚀 Recommended Starting Budget

To use the bot effectively, it is recommended to start with at least **0.3-1 SOL**. This ensures that you can bump for a while

---

## ❌ **FAQ**


### **Error:**  
`Error executing buy order: bad secret key size`

### **Cause:**  
This error occurs when the private key is not properly configured or incorrectly inputted.

### **Solution:**  
Ensure the private key in your `.env` file is correctly formatted and valid.

---
