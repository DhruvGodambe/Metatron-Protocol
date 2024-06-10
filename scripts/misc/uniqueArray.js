const fs = require('fs');

function eliminateDuplicates(fileA, fileB, outputFile) {
  // Read the JSON files
  const dataA = require(fileA);
  const dataB = require(fileB);

  console.log('Data from fileA:', dataA);
  console.log('Data from fileB:', dataB);

  const identifiersA = dataA.map(obj => obj.username);

  const uniqueDataB = dataB.filter(obj => !identifiersA.includes(obj.username));

  // Save the modified contents of fileB to outputFile
  fs.writeFileSync(outputFile, JSON.stringify(uniqueDataB, null, 2));

  return uniqueDataB;
}

// Specify the paths to your JSON files
const fileAPath = '../../airdropUsers3.json';
const fileBPath = '../../NFTairdropUsers3.json';
const outputFile = './modifiedNFTairdropUsers3n.json';

// Call the eliminateDuplicates function
const modifiedFileB = eliminateDuplicates(fileAPath, fileBPath, outputFile);

// Log the modifiedFileB array
console.log('Modified fileB:', modifiedFileB);
