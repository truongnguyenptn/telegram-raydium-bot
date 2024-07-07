import { fetchPools } from '../services/raydiumService.js';
import { getAddressExplorerLink, getAddPoolLink } from '../utils/helper/index.js';

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
 * Fetches pools by type from the API and sends a message with pool information.
 * @param {import('node-telegram-bot-api')} bot - The Telegram bot instance.
 * @param {number} chatId - The chat ID to send the message to.
 * @param {string} poolType - The type of pools to fetch ('all', 'standard', 'concentrated').
 * @param {number} [page=1] - The page number (optional, default is 1).
 * @param {number} [pageSize=10] - The page size (optional, default is 10).
 * @returns {Promise<void>}
 */
export async function fetchPoolsByType(poolType, page = 1, pageSize = 10) {
  const endpoint = `https://api-v3.raydium.io/pools/info/list`;
  const queryParams = {
    poolType: poolType,
    poolSortField: 'default',
    sortType: 'desc',
    pageSize: pageSize,
    page: page,
  };
  const url = generateLink(endpoint, queryParams);

  console.log(`Fetching ${poolType} pools (page ${page}, page size ${pageSize})...`);
  try {
    // Fetch pools from the API
    const response = await fetchPools(url)
    const pools = response.data.data;

    // Construct message with pool details
    let items = [];
    let title = '';

    switch (poolType) {
      case 'all':
        title = '**All Pools:**\n\n';
        break;
      case 'concentrated':
        title = '**Concentrated Pools:**\n\n';
        break;
      case 'standard':
        title = '**Standard Pools:**\n\n';
        break;
      default:
        break;
    }

    items.push(title);
    pools.forEach(pool => {
      items.push(getPoolDetails(pool, poolType));
    });


    // Sending message with Markdown format for icons
    return items.join('\n');
  } catch (error) {
    console.error(`Failed to fetch ${poolType} pools:`, error);
  }
}

/**
 * Generates a link with provided base URL and query parameters.
 * @param {string} baseUrl - The base URL of the link.
 * @param {Object} queryParams - Query parameters as key-value pairs.
 * @returns {string} The generated link with query parameters.
 */
export function generateLink(baseUrl, queryParams) {
  const queryString = Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');

  return `${baseUrl}?${queryString}`;
}

/**
 * Returns formatted pool details based on pool type.
 * @param {PoolInfo} pool - The pool object containing pool details.
 * @param {string} poolType - The type of pool ('all', 'standard', 'concentrated').
 * @returns {string} Formatted pool details as a string.
 */
export function getPoolDetails(pool, poolType) {
  const iconA = pool.mintA.address ? `[${pool.mintA.symbol}](${getAddressExplorerLink(pool.mintA.address)})` : pool.mintA.symbol;
  const iconB = pool.mintB.address ? `[${pool.mintB.symbol}](${getAddressExplorerLink(pool.mintB.address)})` : pool.mintB.symbol;
  const addPoolLink = getAddPoolLink(pool.id);

  let message = `⚖️ ${pool.mintA.name} (${iconA}) ↔️ ${pool.mintB.name} (${iconB}) \n`;
  message += `💧 Liquidity: ${pool.tvl.toFixed(2)}💰\n`;
  message += `💥 24h Volume: ${pool.day.volume.toFixed(2)}💰\n`;
  message += `💸 24h Fee: ${pool.feeRate * 100}%\n`;
  message += `🏦 24h APR: ${pool.day.apr.toFixed(2)}%\n`;
  message += `🔗 [Add liquidity to this pool](${addPoolLink})\n\n`;

  return message;
}
