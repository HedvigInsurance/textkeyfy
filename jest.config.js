module.exports = {
  transform: {
    '\\.ts?$': 'ts-jest',
  },
  testRegex: '\\.test\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
  globals: {
    'ts-jest': { diagnostics: { ignoreCodes: [151001] } },
  },
}
