import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import allPools from './commands/allPools.js';
import concentratedPools from './commands/concentratedPools.js';
import standardPools from './commands/standardPools.js';
import { POOL_TYPES } from './utils/constants.js';

// Load environment variables
dotenv.config();

// Initialize Telegram bot
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
console.log('Bot is starting...');

// Command handlers with pagination
bot.command('all_pools', async (ctx) => {
  console.log('Received /all-pools command');
  try {
    const pools = await allPools(1, 5); // Fetch first 5 pools
    ctx.reply(pools, getPagination({ command: POOL_TYPES.ALL }));
  } catch (error) {
    console.error('Error fetching all pools:', error);
    ctx.reply('Error fetching all pools. Please try again later.');
  }
});

bot.command('concentrated_pools', async (ctx) => {
  console.log('Received /concentrated-pools command');
  try {
    const pools = await concentratedPools(1, 5); // Example: Fetch first 5 pools
    ctx.reply(pools, getPagination({ command: POOL_TYPES.CONCENTRATED }));
  } catch (error) {
    console.error('Error fetching concentrated pools:', error);
    ctx.reply('Error fetching concentrated pools. Please try again later.');
  }
});

bot.command('standard_pools', async (ctx) => {
  console.log('Received /standard-pools command');
  try {
    const pools = await standardPools(1, 5); // Example: Fetch first 5 pools
    ctx.reply(pools, getPagination({ command: POOL_TYPES.STANDARD }));
  } catch (error) {
    console.error('Error fetching standard pools:', error);
    ctx.reply('Error fetching standard pools. Please try again later.');
  }
});

// Handle callback queries for pagination
bot.on('callback_query', async (callbackQuery) => {
  try {
    const data = callbackQuery.update.callback_query.data.split('_');
    const command = data[0];
    const page = parseInt(data[1]);
    await editMessage(callbackQuery, command, page);
  } catch (error) {
    console.error('Error handling callback query:', error);
  }
});

// Default start command
bot.start((ctx) => {
  ctx.reply('Hello! I am your Telegram bot.');
});

// Launch the bot
bot.launch().then(() => {
  console.log('Bot is running');
}).catch((error) => {
  console.error('Error launching bot:', error);
});

// Function to handle editing or replying with pools and pagination
async function editMessage(ctx, command, current) {
  try {
    let pools;
    switch (command) {
      case POOL_TYPES.ALL:
        pools = await allPools(current); // Fetch pools for specific page
        break;
      case POOL_TYPES.CONCENTRATED:
        pools = await concentratedPools(current); // Fetch pools for specific page
        break;
      case POOL_TYPES.STANDARD:
        pools = await standardPools(current); // Fetch pools for specific page
        break;
      default:
        return;
    }

    const maxPage = 10; // Example: Total pages available
    const pagination = getPagination({ current, maxPage, command });

    if (ctx.update.callback_query) {
      await ctx.editMessageText(pools, pagination); // Edit existing message
    } else {
      await ctx.reply(pools, pagination); // Reply with new message
    }
  } catch (error) {
    console.error('Error editing or sending message:', error);
  }
}

// Pagination function
function getPagination({ current = 1, maxPage = 10, command }) {
  const keys = [];
  if (current > 1) keys.push({ text: `« 1`, callback_data: `${command}_1` });
  if (current > 2) keys.push({ text: `‹ ${current - 1}`, callback_data: `${command}_${current - 1}` });
  keys.push({ text: `${current}`, callback_data: `${command}_${current}` });
  if (current < maxPage - 1) keys.push({ text: `${current + 1} ›`, callback_data: `${command}_${current + 1}` });
  if (current < maxPage) keys.push({ text: `${maxPage} »`, callback_data: `${command}_${maxPage}` });

  return {
    reply_markup: {
      inline_keyboard: [keys]
    }
  };
}

export default bot;
