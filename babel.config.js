module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ],
  };
};
