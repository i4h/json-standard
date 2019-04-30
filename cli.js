#!/usr/bin / env node

/* External Interfaces */
const program = require('commander')
var glob = require('glob')

/* Use cases */
const check = require('./check')

/* Constants */
const { version } = require('./package')
const defaultFiles = ['**/*.json']

const resolveGlob = files => files.reduce((acc, file) => [
  ...acc,
  ...glob.sync(file, { ignore: 'node_modules/**' })
], [])

program
  .description('Check or fix json formatting')
  .version(version)
  .option('-f, --fix', 'Fix json formatting')
  .action((...files) => {
    const [cmd] = files.splice(-1)
    const allFiles = files.length === 0 ? resolveGlob(defaultFiles) : resolveGlob(files)
    if (allFiles.length === 0) {
      console.log('No files found')
      return
    }
    return check(allFiles, cmd.fix)
  })

async function run () {
  program.parse(process.argv)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
