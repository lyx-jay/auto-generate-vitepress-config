const {getAllFilesInOneFolder, getAllFolderInRoot, generateNewConfig} = require('./utils')

/**
 * 根据文章目录自动生成配置文件
 * @param defaultConfig 默认的vitepress配置
 * @param root 文章根目录
 * @returns 
 */
 const autoGenerateConfig = (defaultConfig, root) => {
  const newConfig = generateNewConfig(defaultConfig);
  const sidebar = newConfig.themeConfig.sidebar;
  const childFolderPaths = getAllFolderInRoot(root);
  childFolderPaths.forEach(path => {
    const item = getAllFilesInOneFolder(path);
    sidebar.push(item)
  })
  return newConfig;
}

module.exports = autoGenerateConfig;