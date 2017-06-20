export default (webpackConfig, env) => {
  webpackConfig.output.library = 'hljs';
  return webpackConfig;
}
