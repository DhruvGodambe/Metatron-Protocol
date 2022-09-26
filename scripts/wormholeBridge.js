const SOLANA_HOST = "http://solana-devnet:8899";
const SOL_BRIDGE_ADDRESS = "3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5";
const SOL_TOKEN_BRIDGE_ADDRESS = "DZnkkTmCiFWfYTfT41X3Rd1kDgozqzxWaHqsw6W4x2oe";
const connection = new Connection(SOLANA_HOST, "confirmed");
const payerAddress = "0x259989150c6302D5A7AeEc4DA49ABfe1464C58fE";
const mintAddress = "0x259989150c6302D5A7AeEc4DA49ABfe1464C58fE";
const WORMHOLE_RPC_HOST = "https://wormhole-v2-testnet-api.certus.one";
const CHAIN_ID_SOLANA = 1;
const ETH_TOKEN_BRIDGE_ADDRESS = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";

const fromAddress = "0x259989150c6302D5A7AeEc4DA49ABfe1464C58fE";
const amount = 100;
const targetAddress = "";
const CHAIN_ID_ETH = 2;
const originAddress = "";
const originChain = "ETH";

const solanaToETH = async () => {
    const transaction = await attestFromSolana(
        connection,
        SOL_BRIDGE_ADDRESS,
        SOL_TOKEN_BRIDGE_ADDRESS,
        payerAddress,
        mintAddress
    );

    const signed = await wallet.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);

    const info = await connection.getTransaction(txid);
    const sequence = parseSequenceFromLogSolana(info);
    const emitterAddress = await getEmitterAddressSolana(SOL_TOKEN_BRIDGE_ADDRESS);

    const { signedVAA } = await getSignedVAA(
        WORMHOLE_RPC_HOST,
        CHAIN_ID_SOLANA,
        emitterAddress,
        sequence
    );
    // Create the wrapped token on Ethereum
    await createWrappedOnEth(ETH_TOKEN_BRIDGE_ADDRESS, signer, signedVAA);

}

const transferSolanaToETH = async () => {
    const transaction = await transferFromSolana(
        connection,
        SOL_BRIDGE_ADDRESS,
        SOL_TOKEN_BRIDGE_ADDRESS,
        payerAddress,
        fromAddress,
        mintAddress,
        amount,
        targetAddress,
        CHAIN_ID_ETH,
        originAddress,
        originChain
    );
    const signed = await wallet.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);
    // Get the sequence number and emitter address required to fetch the signedVAA of our message
    const info = await connection.getTransaction(txid);
    const sequence = parseSequenceFromLogSolana(info);
    const emitterAddress = await getEmitterAddressSolana(SOL_TOKEN_BRIDGE_ADDRESS);
    // Fetch the signedVAA from the Wormhole Network (this may require retries while you wait for confirmation)
    const { signedVAA } = await getSignedVAA(
        WORMHOLE_RPC_HOST,
        CHAIN_ID_SOLANA,
        emitterAddress,
        sequence
    );
    // Redeem on Ethereum
    await redeemOnEth(ETH_TOKEN_BRIDGE_ADDRESS, signer, signedVAA);
}