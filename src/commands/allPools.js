import { fetchPoolsByType } from '../utils/index.js';



/**
 * Fetches all pools from the API and sends a message with pool information.
 * @param {import('node-telegram-bot-api')} bot - The Telegram bot instance.
 * @param {number} chatId - The chat ID to send the message to.
 * @param {number} [page=1] - The page number (optional, default is 1).
 * @param {number} [pageSize=10] - The page size (optional, default is 10).
 * @returns {Promise<void>}
 */
export default async function allPools(page = 1, pageSize = 5) {
  const message = await fetchPoolsByType('all', page, pageSize)
  return message;
}
