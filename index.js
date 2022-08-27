const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * 匹配md一级标题
 * @param {String} filePath 文件路径
 * @param {String} fileName 文件名字，作为匹配不到一级标题时的补充值
 * @returns 
 */
async function getMdH1Title(filePath, fileName) {
  let text;
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (!line) continue;
    text = line.replace(/^# (.*)/gim, `$1`);
    if (text === line) return fileName;
    return text;
  }
}



/**
 * 
 * @param {Object} config sidebar为空的config对象
 * @param {String} rootfolderPath 存放文章的最外层目录
 * @returns Object
 */
const auto_generate_config = function (config, rootfolderPath) {

  rootfolderPath = __dirname.replace(/.vitepress/, '') + rootfolderPath;
  const newConfig = JSON.parse(JSON.stringify(config));
  const fileFolderNames = fs.readdirSync(rootfolderPath);
  const folderNames = [];  // 所有文件夹名称

  // 获取根目录下的所有文件夹名称
  fileFolderNames.forEach(item => {
    const location = path.join(rootfolderPath, item);
    const info = fs.statSync(location);
    if (info.isDirectory()) {
      folderNames.push(item);
    }
  })

  // 为每一个文件夹创建sidebar
  folderNames.forEach(folder => {
    newConfig.themeConfig.sidebar.push(
      {
        text: folder,
        collapsed: true,
        collapsible: true,
        items: []
      }
    )
  })

  folderNames.forEach(folder => {
    // 获取子文件夹的路径
    const folderPath = rootfolderPath + '/' + folder;
    // 检测当前子目录下的所有文件
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
      const name = file;
      const filePath = folderPath + '/' + file;
      // 将文件名和其路径添加到sidebar对应的items中
      newConfig.themeConfig.sidebar.forEach(async sidebar => {
        if (sidebar.text === folder) {
          const title = await getMdH1Title(filePath, name);
          sidebar.items.push({
            text: title || name.replace(/(.md)$/, ''),
            link: filePath.replace(/.*(?=\/handbook)/, '')
          });
          console.log(sidebar)
          return;
        }
      })
    })
  });

  return newConfig;
}



module.exports = auto_generate_config;