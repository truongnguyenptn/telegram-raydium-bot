/**
 * Represents a pool mint details.
 * @typedef {Object} PoolMintDetails
 * @property {number} chainId - The chain ID.
 * @property {string} address - The address of the mint.
 * @property {string} programId - The program ID.
 * @property {string} logoURI - The logo URI of the mint.
 * @property {string} symbol - The symbol of the mint.
 * @property {string} name - The name of the mint.
 * @property {number} decimals - The decimals of the mint.
 * @property {string[]} tags - Tags associated with the mint.
 * @property {Object} extensions - Additional extensions.
 */

/**
 * Represents the day/week/month information in a pool.
 * @typedef {Object} PoolPeriodInfo
 * @property {number} volume - Volume for the period.
 * @property {number} volumeQuote - Volume quote for the period.
 * @property {number} volumeFee - Volume fee for the period.
 * @property {number} apr - APR for the period.
 * @property {number} feeApr - Fee APR for the period.
 * @property {number} priceMin - Minimum price for the period.
 * @property {number} priceMax - Maximum price for the period.
 * @property {any[]} rewardApr - Reward APR for the period.
 */

/**
 * Represents a pool in the response data.
 * @typedef {Object} PoolInfo
 * @property {string} type - The type of pool.
 * @property {string} programId - The program ID of the pool.
 * @property {string} id - The ID of the pool.
 * @property {PoolMintDetails} mintA - Details of mint A.
 * @property {PoolMintDetails} mintB - Details of mint B.
 * @property {number} price - The price of the pool.
 * @property {number} mintAmountA - Mint amount for mint A.
 * @property {number} mintAmountB - Mint amount for mint B.
 * @property {number} feeRate - The fee rate of the pool.
 * @property {string} openTime - The open time of the pool.
 * @property {number} tvl - The total value locked (TVL) of the pool.
 * @property {PoolPeriodInfo} day - Day information.
 * @property {PoolPeriodInfo} week - Week information.
 * @property {PoolPeriodInfo} month - Month information.
 * @property {string[]} pooltype - Pool types.
 * @property {any[]} rewardDefaultInfos - Reward default information.
 * @property {number} farmUpcomingCount - Count of upcoming farms.
 * @property {number} farmOngoingCount - Count of ongoing farms.
 * @property {number} farmFinishedCount - Count of finished farms.
 * @property {string} marketId - The market ID.
 * @property {PoolMintDetails} lpMint - Details of LP mint.
 * @property {number} lpPrice - The LP price.
 * @property {number} lpAmount - The LP amount.
 */

/**
 * Represents the response structure from the API.
 * @typedef {Object} PoolsResponse
 * @property {string} id - The ID of the response.
 * @property {boolean} success - Whether the request was successful.
 * @property {Object} data - The data object containing pool information.
 * @property {number} data.count - The count of pools returned.
 * @property {PoolInfo[]} data.data - An array of PoolInfo objects.
 * @property {boolean} data.hasNextPage - Whether there is a next page of data.
 */

/**
 * Generates a link to add a pool ID on Raydium's liquidity page.
 * @param {string} poolId - The ID of the pool to add.
 * @returns {string} The URL to add the specified pool ID on Raydium's liquidity page.
 */


/**
 * Parameters for fetching pools by type.
 * @typedef {Object} FetchPoolsParams
 * @property {import('node-telegram-bot-api')} bot - The Telegram bot instance.
 * @property {number} chatId - The chat ID to send the message to.
 * @property {number} [page=1] - The page number (optional, default is 1).
 * @property {number} [pageSize=10] - The page size (optional, default is 10).
 */


/**
 * Promise that resolves when pools are fetched and message is sent.
 * @typedef {Promise<void>} FetchPoolsPromise
 */
