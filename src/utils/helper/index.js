export function getAddPoolLink(poolId) {
  return `https://raydium.io/liquidity/increase/?mode=add&pool_id=${poolId}`;
}

/**
 * Generates a Solana address explorer link for the given address.
 * @param {string} address - The Solana address to generate the link for.
 * @returns {string} The explorer link for the given address.
 */
export function getAddressExplorerLink(address) {
  return `https://explorer.solana.com/address/${address}`;
}

export function escapeMarkdown(text) {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}