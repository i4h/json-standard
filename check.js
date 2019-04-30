const { EOL } = require('os')
const { readFileSync, writeFileSync } = require('fs')
const { space } = require('./config')

const checkValidity = (files) => {
  const problems = files.map(file => {
    try {
      JSON.parse(readFileSync(file))
    } catch (err) {
      return `Error in ${file}: ${err.message}`
    }
  }).filter(problem => problem)
  return problems
}

const checkFormatting = (files, fix) => {
  const problems = files.map(file => {
    try {
      const original = readFileSync(file, 'utf8')
      const formatted = `${JSON.stringify(JSON.parse(original), null, space)}${EOL}`
      if (original !== formatted) {
        if (fix) {
          writeFileSync(file, formatted)
          return `Fixed formatting of ${file}`
        }
        return `${file} is not formatted correctly`
      }
    } catch (err) { }
  }).filter(problem => problem)
  return problems
}

module.exports = (files, fix) => {
  const validityProblems = checkValidity(files)
  const formattingProblems = checkFormatting(files, fix)
  if (validityProblems.length + formattingProblems.length === 0) {
    console.log('No problems found')
    return
  }

  if (fix) {
    if (validityProblems.length > 0) {
      console.log('Found unfixable validity problems:')
      console.log(validityProblems.map(problem => `  ${problem}`).join(EOL))
    }
  } else {
    console.log(validityProblems.join(EOL))
  }
  console.log(formattingProblems.join(EOL))
}
