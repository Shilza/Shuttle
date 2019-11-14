module.exports = ({config}) => {
  const babelLoaderRule = config.module.rules.filter(rule => rule.test.toString() === /\.(js|mjs|jsx|ts|tsx)$/.toString())[1];
  babelLoaderRule.options.plugins.push(require.resolve("@babel/plugin-proposal-export-default-from"));
  return config;
};
