const { readFileSync, writeFileSync } = require('fs')
const check = require('../../check')

jest.mock('../../config', () => ({ space: 2 }))
jest.mock('fs')
const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { })

const file = 'testfile'
const badJSON = `{ "foo": "bar"  }`
const goodJSON = `{
  "foo": "bar"
}
`
describe('test check module', () => {
  it('should log an error if the file can not be parsed', async () => {
    readFileSync.mockReturnValueOnce(new Error())
    check([file])
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`Error in ${file}`)))
  })

  it('should report unfixable problems if a file can not be parsed', async () => {
    readFileSync.mockReturnValueOnce(new Error())
    check([file], true)
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/unfixable/))
  })

  it('should log an error if the file is not formatted correctly', async () => {
    readFileSync.mockReturnValue(badJSON)
    check([file])
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`${file} is not formatted correctly`)))
  })

  it('should fix a file that is not formatted correctly', async () => {
    readFileSync.mockReturnValue(badJSON)
    check([file], true)
    expect(writeFileSync).toHaveBeenCalledWith(file, goodJSON)
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`Fixed formatting of ${file}`)))
  })

  it('should report no problems if all is good', async () => {
    readFileSync.mockReturnValue(goodJSON)
    check([file])
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/No problems/))
  })
})
