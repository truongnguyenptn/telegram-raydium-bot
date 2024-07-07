# Telegram Bot for Raydium Liquidity Pools

## Description

Raydium is one of the longest-standing and most renowned decentralized exchanges (DEX) on the Solana network. This bounty task involves building a Telegram bot that supports the following commands to interact with Raydium's liquidity pools:

- `/all-pools`: Displays all liquidity pools currently available on Raydium. (Similar to pools shown on [Raydium All Pools](https://raydium.io/liquidity-pools/?tab=all))

- `/concentrated-pools`: Displays all concentrated liquidity pools currently available on Raydium. (Similar to pools shown on [Raydium Concentrated Pools](https://raydium.io/liquidity-pools/?tab=concentrated))

- `/standard-pools`: Displays all standard liquidity pools currently available on Raydium. (Similar to pools shown on [Raydium Standard Pools](https://raydium.io/liquidity-pools/?tab=standard))

Each pool will include basic information such as: token pair, liquidity, 24h volume, 24h fee, and 24h APR.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/truongnguyenptn/telegram-raydium-bot
cd telegram-raydium-bot
npm install
```

Create a `.env` file in the root directory and add necessary environment variables:

```plaintext
API_KEY=your_api_key
```

## Usage

Once installed, start the bot using:

```bash
npm start
```

## API

### `/all-pools`

Command to fetch and display all liquidity pools on Raydium.

### `/concentrated-pools`

Command to fetch and display all concentrated liquidity pools on Raydium.

### `/standard-pools`

Command to fetch and display all standard liquidity pools on Raydium.

Each command retrieves pool information including token pairs, liquidity, 24h volume, 24h fee, and 24h APR.

## Contributing

Contributions are welcome! Here's how you can contribute to this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make changes and commit (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature`)
5. Create a pull request

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
