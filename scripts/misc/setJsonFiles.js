const fs = require('fs');

const sourceFilePath = './meta-data/Enoch Football Collection metadata/301.json';

for (let i = 302; i <= 400; i++) {
  const destinationFilePath = `./meta-data/Enoch Football Collection metadata/${i}.json`;
  
  fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
    if (err) {
      console.log(`Error copying file ${sourceFilePath} to ${destinationFilePath}:`, err);
    } else {
      console.log(`Copied contents from ${sourceFilePath} to ${destinationFilePath}`);
    }
  });
}
