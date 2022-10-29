
const {getAllFilesInOneFolder, getAllFolderInRoot, getAllFolderInRootInMultiMode, generateNav } = require('./utils')

/**
 * 
 * @param config 
 * @param root 相对于根目录下的文件夹路径 docs
 * @returns 
 */
function autoGenerateConfigMulti(config) {
  const newConfig = generateNewConfig(config)
  const folders = getAllFolderInRootInMultiMode()
  const sidebar = newConfig.themeConfig.sidebar
  const navs = generateNav(folders)
  newConfig.themeConfig.nav = navs
  navs.forEach((navItem) => {
    const link = navItem.link
    const path = link.replace(/\//, '')
    const childFolderPaths = getAllFolderInRoot(path)
    sidebar[link] = []
    childFolderPaths.forEach(path => {
      const item = getAllFilesInOneFolder(path);
      sidebar[link].push(item)
    })
  })
  return newConfig
}

module.exports = autoGenerateConfigMulti