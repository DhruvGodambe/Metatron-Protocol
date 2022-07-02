const { ethers } = require("hardhat");
const { signMetaTxRequest } = require("../utils/signer");
const { readFileSync, writeFileSync } = require("fs");

const DEFAULT_NAME = "sign-test";

function getInstance(name) {
  const address = JSON.parse(readFileSync("deploy.json"))[name];
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`);
  return ethers.getContractFactory(name).then((f) => f.attach(address));
}

async function main() {
  const forwarder = await getInstance("MinimalForwarder");
  const registry = await getInstance("Registry");

  const { NAME: name, PRIVATE_KEY_2: signer } = process.env;
  const from = new ethers.Wallet(signer).address;

  // signing simple registry
  console.log(`Signing registration of ${name || DEFAULT_NAME} as ${from}...`);
  const data = registry.interface.encodeFunctionData("register", [
    name || DEFAULT_NAME,
  ]);
  const result = await signMetaTxRequest(signer, forwarder, {
    to: registry.address,
    from,
    data,
  });

  writeFileSync("request.json", JSON.stringify(result, null, 2));
  console.log(`Signature: `, result.signature);
  console.log(`Request: `, result.request);

  //  signing mockToken transfer
  // const {
  //   NAME: name,
  //   PRIVATE_KEY_2: signer,
  //   PRIVATE_KEY_1: fromAddress,
  // } = process.env;
  // const from = new ethers.Wallet(fromAddress).address;
  // const to = new ethers.Wallet(toAddress).address;
  // const amount = "10000000000000000000";
  // console.log(
  //   `Signing mockToken transfer of amount  ${amount} from ${from}...  to ${to}`
  // );
  // const data = registry.interface.encodeFunctionData("transfer", [
  //   toAddress,
  //   amount,
  // ]);
  // const result = await signMetaTxRequest(signer, forwarder, {
  //   to: registry.address,
  //   from,
  //   data,
  // });

  // writeFileSync("request.json", JSON.stringify(result, null, 2));
  // console.log(`Signature: `, result.signature);
  // console.log(`Request: `, result.request);
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
