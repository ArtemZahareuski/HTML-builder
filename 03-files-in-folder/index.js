const fs = require('fs');
const path = require('path');
const { stdout } = process;

const directory = path.join(__dirname, 'secret-folder');

 fs.readdir(directory, { withFileTypes: true }, (err, files) => {
   files.forEach((file) => {
      if (file.isFile()) {
        const pathFile = path.join(directory, file.name) // получение пути к файлу
        const arrName = path.basename(pathFile).split('.'); // получение последнего имени в path и разбиение на имя и расширение
        const fileName = arrName[0]; // получение имени 
        const extension = arrName[1]; // получение расширения

        fs.stat(pathFile, (err, stats) => {
          stdout.write(`${fileName} - ${extension} - ${stats.size} bytes\n`)
        })
      }
   });
 })

