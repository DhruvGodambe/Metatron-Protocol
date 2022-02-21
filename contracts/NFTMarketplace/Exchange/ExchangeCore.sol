// function => sign an order (buy or sell) => user signs with his pvt key => metamask pop-up
// won't execute on same time, just signed and stored

// validation => signature, buyer address, auctionTime
// => calls execute order(signature) internal fn
//      => update owner of NFT in Minting Factory (Interface)
//      => Royalties distribution
