export default (webpackConfig, env) => {
  // global var for heightlight js
  webpackConfig.output.library = 'hljs';

  webpackConfig.module.loaders.forEach(loader => {
    //exclude url loader for fonts
    if (loader.loader === 'url') {
      loader.exclude.push(/\.(eot|ttf|woff|svg)$/)
    }
  });

  //add file loader for fonts
  webpackConfig.module.loaders.push({
    test: /\.(eot|ttf|woff|svg)$/,
    loader: 'file?name=assets/fonts/[name].[ext]',
    exclude: /node_modules/
  });

  return webpackConfig;
}
