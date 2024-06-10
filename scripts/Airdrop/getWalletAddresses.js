const { ethers } = require('ethers');
const fs = require('fs');

const providerUrl = 'https://polygon-mumbai.g.alchemy.com/v2/f6k3KCMTuhCll4HVhmiyaZWDGxpkFFbo'; // Mumbai network RPC endpoint

async function getWalletAddresses() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const blockNumber = await provider.getBlockNumber();

    const addresses = new Set();

    for (let i = blockNumber; i > 0 && addresses.size < 100; i--) {
      const block = await provider.getBlock(i);

      for (const transactionHash of block.transactions) {
        const transaction = await provider.getTransaction(transactionHash);
        addresses.add(transaction.from);
        addresses.add(transaction.to);

        if (addresses.size >= 100) {
          break;
        }
      }
    }

    return Array.from(addresses);
  } catch (error) {
    console.error('Failed to retrieve wallet addresses:', error.message);
    return [];
  }
}

async function saveAddressesToJson(addresses) {
  const data = JSON.stringify(addresses, null, 2);
  fs.writeFileSync('wallet_addresses.json', data);
  console.log('Addresses saved to wallet_addresses.json');
}

async function main() {
  const numAddresses = 100;
  const addresses = await getWalletAddresses();
  const selectedAddresses = addresses.slice(0, numAddresses);
  saveAddressesToJson(selectedAddresses);
}

main().catch(console.error);
