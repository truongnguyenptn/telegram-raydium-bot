import TelegramBot from 'node-telegram-bot-api';
import allPools from './commands/allPools.js';
import concentratedPools from './commands/concentratedPools.js';
import standardPools from './commands/standardPools.js';
import dotenv from 'dotenv';

// Load from file .env
dotenv.config();

// Load bot key 
const token = process.env.TELEGRAM_BOT_TOKEN;
console.log('Bot is starting...');
const bot = new TelegramBot(token, { polling: true });
console.log('Bot is running and listening for messages.');

// Track pagination for each command and user
let userPagination = {};

// Function to get pagination keyboard markup
function getPagination(current, maxPage, command) {
  const keys = [];
  if (current > 1) keys.push({ text: `« 1`, callback_data: `${command}_1` });
  if (current > 2) keys.push({ text: `‹ ${current - 1}`, callback_data: `${command}_${current - 1}` });
  keys.push({ text: `-${current}-`, callback_data: `${command}_${current}` });
  if (current < maxPage - 1) keys.push({ text: `${current + 1} ›`, callback_data: `${command}_${current + 1}` });
  if (current < maxPage) keys.push({ text: `${maxPage} »`, callback_data: `${command}_${maxPage}` });

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [keys]
    })
  };
}

// Handle /all-pools command
bot.onText(/\/all-pools/, (msg) => {
  console.log('Received /all-pools command');
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  userPagination[userId] = userPagination[userId] || {};
  userPagination[userId].allPools = userPagination[userId].allPools || 1;
  const currentPage = userPagination[userId].allPools;
  allPools(bot, chatId, currentPage);
});

// Handle /concentrated-pools command
bot.onText(/\/concentrated-pools/, (msg) => {
  console.log('Received /concentrated-pools command');
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  userPagination[userId] = userPagination[userId] || {};
  userPagination[userId].concentratedPools = userPagination[userId].concentratedPools || 1;
  const currentPage = userPagination[userId].concentratedPools;
  concentratedPools(bot, chatId, currentPage);
});

// Handle /standard-pools command
bot.onText(/\/standard-pools/, (msg) => {
  console.log('Received /standard-pools command');
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  userPagination[userId] = userPagination[userId] || {};
  userPagination[userId].standardPools = userPagination[userId].standardPools || 1;
  const currentPage = userPagination[userId].standardPools;
  standardPools(bot, chatId, currentPage);
});

// Handle callback queries for pagination
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data.split('_');
  const command = data[0];
  const page = parseInt(data[1]);
  const userId = callbackQuery.from.id;

  // Update pagination for the specific user and command
  userPagination[userId] = userPagination[userId] || {};
  userPagination[userId][command] = page;

  // Fetch and update message with new page
  switch (command) {
    case 'allPools':
      allPools(bot, message.chat.id, page);
      break;
    case 'concentratedPools':
      concentratedPools(bot, message.chat.id, page);
      break;
    case 'standardPools':
      standardPools(bot, message.chat.id, page);
      break;
    default:
      break;
  }

  // Edit message with updated pagination buttons
  bot.editMessageText(`Page: ${page}`, {
    chat_id: message.chat.id,
    message_id: message.message_id,
    reply_markup: getPagination(page, bookPages, command)
  });
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! I am your Telegram bot.');
});

export default bot;
