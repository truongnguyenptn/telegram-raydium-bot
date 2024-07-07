import fetch from 'node-fetch';

export async function fetchPools(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch data from Raydium API');
    }
  } catch (error) {
    console.error('Error fetching pools:', error);
    throw error;
  }
}
