const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const pathName = require('path');

const pathToProjectDist = pathName.join(__dirname, 'project-dist');
const pathToAssets = pathName.join(__dirname, 'assets');
const pathToNewAssets = pathName.join(pathToProjectDist, 'assets');
const pathToComponents = pathName.join(__dirname, 'components');

fs.mkdir(pathToProjectDist, err => {
  
});

const writeStreamHtml = fs.createWriteStream(pathName.join(pathToProjectDist, 'index.html'));
const writeStreamCss = fs.createWriteStream(pathName.join(pathToProjectDist, 'style.css'));

async function copyDir() {
  await fsPromises.mkdir(pathName.join(pathToProjectDist, 'assets'), { recursive: true }); 
  await fsPromises.mkdir(pathName.join(pathToProjectDist, 'assets', 'fonts'), { recursive: true }); 
  await fsPromises.mkdir(pathName.join(pathToProjectDist, 'assets', 'img'), { recursive: true }); 
  await fsPromises.mkdir(pathName.join(pathToProjectDist, 'assets', 'svg'), { recursive: true }); 

  const fonts = await fsPromises.readdir(pathName.join(pathToAssets, 'fonts'), { withFileTypes: true }, (err, folder) => {
    return folder; 
  });
  fonts.forEach((file) => {
    const pathCopyFolder = pathName.join(pathToAssets, 'fonts', file.name);
    const pathNewFolder = pathName.join(pathToNewAssets, 'fonts', file.name);
    fsPromises.copyFile(pathCopyFolder, pathNewFolder); // производим копирование файлов из одной папки в другую
  });
  const images = await fsPromises.readdir(pathName.join(pathToAssets, 'img'), { withFileTypes: true }, (err, folder) => {
    return folder; 
  });
  images.forEach((file) => {
    const pathCopyFolder = pathName.join(pathToAssets, 'img', file.name);
    const pathNewFolder = pathName.join(pathToNewAssets, 'img', file.name);
    fsPromises.copyFile(pathCopyFolder, pathNewFolder); // производим копирование файлов из одной папки в другую
  });
  const svgImages = await fsPromises.readdir(pathName.join(pathToAssets, 'svg'), { withFileTypes: true }, (err, folder) => {
    return folder; 
  });
  svgImages.forEach((file) => {
    const pathCopyFolder = pathName.join(pathToAssets, 'svg', file.name);
    const pathNewFolder = pathName.join(pathToNewAssets, 'svg', file.name);
    fsPromises.copyFile(pathCopyFolder, pathNewFolder); // производим копирование файлов из одной папки в другую
  })
}

copyDir();

const pathStyles = pathName.join(__dirname, 'styles'); // указываем путь к папке со стилями
const pathToStilesFile = pathName.join(pathToProjectDist, 'style'); // указываем путь к файлу в который будем мержить стили

fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    if((file.name).split('.')[1] === 'css') {
       const readFileStream = fs.createReadStream(pathName.join(pathStyles, file.name)); // если файл с расширением css, тогда читаем его содержимое 
       readFileStream.on('data', (chunk) => {
        writeStreamCss.write(chunk.toString()); // и записываем это содержимое в файл bundle.css
      })
    }
  })
})


const pathToTemplate = pathName.join(__dirname, 'template.html'); 

//  function changeTemplate () {
//   let files = fsPromises.readdir(pathToComponents,  { withFileTypes: true });
//   // let streamTemplateContent = fs.createReadStream(pathToTemplate);
//   for(let i = 0; i < files.length; i += 1) {
//     const filePath = pathName.join(pathToComponents, files[i].name);
//     if (files[i].isFile() && pathName.extname(filePath) === '.html') {
//       console.log('hi');
//       // const fileName = files[i].split('.')[0];
//       // const fileContent = fsPromises.readFile(filePath.toString());
//       // templateContent = templateContent.replace(`{{${fileName}}}`, fileContent.toString())
//     } else {
//       console.log('error');
//     }
//   }
  
// }

// changeTemplate();

console.log('\n Подскажите пожалуйста, как заменить содержимое template на содержимое файлов компонентов?\n Пробовал через replace, но не получается\n Поделитесь идеями как это делали вы. Заранее спасибо!\n')



