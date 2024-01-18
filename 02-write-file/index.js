const fs = require("fs");
const pathName = require('node:path');
const {stdin, stdout} = process;

const writeStream = fs.createWriteStream(pathName.join(__dirname, './new-text-file.txt'));

stdout.write("hello! write some text:\n");

stdin.on('data', (data) => {
  if(data.toString().toLocaleLowerCase().trim() === 'exit') {
    process.exit(console.log('Good bue!'));
  } else {
    writeStream.write(data.toString());
  }
})

process.on('SIGINT', () => {
  process.exit(console.log('Good bue!'));
})