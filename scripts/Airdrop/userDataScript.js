const fs = require("fs");

async function removeDuplicateAddresses(data) {
  const uniqueAddresses = [];
  const result = [];

  for (const obj of data) {
    const address = obj["Wallet Address"];

    if (!uniqueAddresses.includes(address)) {
      uniqueAddresses.push(address);
      result.push(obj);
    }
  }

  return result;
}

async function validateAddresses(data) {
  for (const obj of data) {
    const address = obj["Wallet Address"];
    const existsOnPolygon = isEvmAddress(address);
    obj["Address exists on BSC"] = existsOnPolygon;
  }

  return data;
}

async function indexSrNo(data) {
  let srNo = 1;
  for (const obj of data) {
    obj["Sr no."] = srNo;
    srNo++;
  }
  return data;
}

function isEvmAddress(address) {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
}

async function processJsonFile(jsonFilePath) {
  try {
    const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
    const data = JSON.parse(jsonData);

    const filteredData = await removeDuplicateAddresses(data);
    const indexedData = await indexSrNo(filteredData);
    const validatedData = await validateAddresses(indexedData);

    const updatedJsonData = JSON.stringify(validatedData, null, 2);
    fs.writeFileSync(jsonFilePath, updatedJsonData);

    console.log("Processing completed successfully.");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

function addEmptyFields(jsonFilePath) {
  try {
    const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
    const data = JSON.parse(jsonData);

    let txhash = "";
    for(let i in data) {

      if(data[i].TxHash){
        txhash = data[i].TxHash
      } else {
        const tempData = data[i]
        tempData.TxHash = txhash
        tempData.TransactionURL = "https://polygonscan.com/tx/" + txhash
        data[i] = tempData;
      }

    }

    const updatedJsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsonFilePath, updatedJsonData);

    console.log("Processing completed successfully.");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Replace "input.json" with your JSON file name
processJsonFile("NFTairdropUsers2.json");
