const fsPromises = require('fs').promises;
const pathName = require('path');

const copyFolder = pathName.join(__dirname, 'files');
const newFolder = pathName.join(__dirname, 'files-copy');

async function copyDir() {
  await fsPromises.mkdir(newFolder, { recursive: true }); // создаем новый каталог 

  // создаем массив из файлов которые нужно скопировать 
  const files = await fsPromises.readdir(copyFolder, { withFileTypes: true }, (err, files) => {
    return files; 
  });

   files.forEach((file) => {
     const pathCopyFolder = pathName.join(copyFolder, file.name);
     const pathNewFolder = pathName.join(newFolder, file.name);
     fsPromises.copyFile(pathCopyFolder, pathNewFolder); // производим копирование файлов из одной папки в другую
   })
}

copyDir();