module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: [
    '**/*.spec.(js|ts|jsx|tsx)',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
}
