const fs = require("fs");
const path = require("path");

function getDir(dirName) {
  return path.resolve(__dirname, `./${dirName}/`);
}

const dirStrArr = ["03sort算法", "problems"];

const dirArr = dirStrArr.map(dirStr => getDir(dirStr));
const fileArr = dirArr.map(dir => fs.readdirSync(dir));
console.log("fileArr->", fileArr);
// const reg = /^\d+\.+\.js/;
const reg = /^\d+[一-龥]|\w+\.js$/;
const lengthArr = fileArr.map(file => file.filter(item => reg.test(item)).length);

dirStrArr.forEach((item, index) => {
  console.log(`文件夹${item}, 文件数量${lengthArr[index]}`);
})