const fs = require('fs');
const pathName = require('path');

const pathStyles = pathName.join(__dirname, 'styles'); // указываем путь к папке со стилями  
const pathProjectDist = pathName.join(__dirname, 'project-dist'); // указываем путь к папке в которую будет добавлять новый файл стилей 
const writeStream = fs.createWriteStream(pathName.join(pathProjectDist, 'bundle.css')); // создаем запись в файл bundle

// читаем содержимое папки стилей 
fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    if((file.name).split('.')[1] === 'css') {
       const readFileStream = fs.createReadStream(pathName.join(pathStyles, file.name)); // если файл с расширением css, тогда читаем его содержимое 
       readFileStream.on('data', (chunk) => {
         writeStream.write(chunk.toString()); // и записываем это содержимое в файл bundle.css
      })
    }
  })
})