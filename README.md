# Development Procedure

1. Open two terminals
    terminal 1:
        run the following command:
        ```
        npx hardhat node
        ```

        This will start a local development blockchain at port 8545

    terminal 2:
        after setting up terminal 1, run all the other comands in here.
        
        Start with running scripts
        ```
        npx hardhat run scripts/deployMintingFactory.js --network localhost
        npx hardhat run scripts/exchangeApprovals.js --network localhost
        ```

        Then run test cases
        ```
        npx hardhat test --network localhost
        ```

TransparentUpgradeableProxy : 0xe5Ed8792299d052825Ade90DEb81191c7DE16D61
ProxyAdmin : 0xb61EaFD1DDe8E0a7DA488bb27b21306C9f36706f
ERC721MintingFactory : 0x6677DF5f32CD00e7E0b00418d2200B1BdE6A2474
V2 Contract Deployed To: 0xe5Ed8792299d052825Ade90DEb81191c7DE16D61

Enoch token : 