const { readFileSync } = require('fs')
const projectConfig = JSON.parse(readFileSync('./package.json'))['json-standard'] || {}

const defaultConfig = { space: 2 }

module.exports = {
  ...defaultConfig,
  ...projectConfig
}
