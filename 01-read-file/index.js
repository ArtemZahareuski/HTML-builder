const path = require('node:path')
const fs = require('fs');

const pathName = path.join(__dirname, 'text.txt')
const readStream = fs.createReadStream(pathName)

readStream.on('data', (chunk) => {
  console.log(`Reabable text: \n ${chunk.toString()}`);
})