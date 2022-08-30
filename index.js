const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * match the first-level title
 * @param {String} filePath file path
 * @returns 
 */
async function getMdH1Title(filePath) {
  let text;
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (!line) continue;
    text = line.replace(/^# (.*)/gim, `$1`);
    // When no first-level title is matched, return ''
    if (text === line) return '';
    return text;
  }
  // Returns '' when there is no content in the file
  return '';
}

/**
 * 
 * @param {Object} config config object with empty sidebar
 * @param {String} rootfolderPath The root directory where articles are stored
 * @returns Object
 */
const auto_generate_config = function (config, rootfolderPath) {

  rootfolderPath = __dirname.replace(/.vitepress/, '') + rootfolderPath;
  const newConfig = JSON.parse(JSON.stringify(config));
  const fileFolderNames = fs.readdirSync(rootfolderPath);
  const folderNames = [];  // all file folder names

  // get all file folder names 
  fileFolderNames.forEach(item => {
    const location = path.join(rootfolderPath, item);
    const info = fs.statSync(location);
    if (info.isDirectory()) {
      folderNames.push(item);
    }
  })

  // Create a sidebar object for each folder
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
    // Get the path of the subfolder
    const folderPath = rootfolderPath + '/' + folder;
    // Detect all files in the current subdirectory
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
      const name = file;
      const filePath = folderPath + '/' + file;
      // Add the file name and path to the items corresponding to the sidebar
      newConfig.themeConfig.sidebar.forEach(async sidebar => {
        if (sidebar.text === folder) {
          const title = await getMdH1Title(filePath);
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