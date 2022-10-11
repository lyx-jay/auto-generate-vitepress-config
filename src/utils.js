const fs = require('fs');
const {resolve} = require('path')
const lineByLine = require('n-readlines');

const dirname = resolve(process.cwd(), 'docs');

/**
 * 获得根目录下的所有文件夹
 * @param root 文章根目录
 * @returns 
 */
 const getAllFolderInRoot = (root) => {
  const folderPaths= [];
  fs.readdirSync(resolve(dirname, root)).forEach(item => {
    const location = resolve(dirname, root + '/' + item)
    const info = fs.statSync(location);
    if (info.isDirectory()) {
      folderPaths.push(root + '/' + item);
    }
  })
  return folderPaths
}


/**
 * 生成文件夹对应的 sidebar 信息
 */
 const getAllFilesInOneFolder = (folderPath) => {
  const absolutePath = resolve(dirname, folderPath);
  const parentFolderName = folderPath.match(/(?<=\/)\w+$/g)[0];
  const fileNames = fs.readdirSync(absolutePath);
  const articles = fileNames.map(fileName => {
    const name = getFileName(folderPath + '/' + fileName);
    return {
      text: name,
      link: '/' + folderPath + '/' + fileName
    }
  });
  return {
    text: parentFolderName,
    items: articles
  }
}

/**
 * 生成一个新的config
 * @param config vitepress 配置对象
 */
 const generateSidebar = (config) => {
  try {
    const newConfig = JSON.parse(JSON.stringify(config));
    return newConfig
  } catch (error) {
    console.error('errors occue while deeping copy config ' + error)
  }
}



/**
 * 获取文件名称
 * @param path 文件路径
 * @returns 
 */
const getFileName = (path) => {
  const absolutePath = resolve(dirname, path);
  let text = '';
  const liner = new lineByLine(absolutePath);
  let line = null;
  while (line = liner.next()) {
    text = line.toString().replace(/^# (.*$)/gim, '$1');
    if (text) break;
  }
  if (text.includes('#')) {
    const res = path.match(/(\w+).md$/g);
    return res[0].replace('.md', '')
  }
  return text;
}

export {
  getAllFilesInOneFolder,
  getAllFolderInRoot,
  generateSidebar
}