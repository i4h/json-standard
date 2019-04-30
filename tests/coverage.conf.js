const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'check.js'
  ],
  coverageThreshold: {
    global: {
      lines: 5
    }
  },
  coverageReporters: ['text', 'lcov', 'text-summary']
}
