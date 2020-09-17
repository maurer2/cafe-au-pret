module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: [
    // '^.+\\.js$": "<rootDir>/node_modules/babel-jest',
    '**/*.spec.(js|ts|jsx|tsx)',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
  snapshotSerializers: ['jest-serializer-vue'],
}
