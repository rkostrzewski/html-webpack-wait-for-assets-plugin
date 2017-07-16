# html-webpack-wait-for-assets-plugin

Plugin for [HtmlWebpackPlugin] that blocks template execution until specified assets are available (i.e. they exist on the disk).

Usefull for multi-entry webpack compilation that requires cross entry outputs.

## Usage

Add it after [HtmlWebpackPlugin] in `plugins` section of `webpack.config.js`:

```
const HtmlWebpackWaitForAssetsPlugin = require('html-webpack-wait-for-assets-plugin')

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackWaitForAssetsPlugin({
      assets: ['absolute/path/to/some/file'],
      timeout: 30 * 1000 // default: 10000 ms
    })
  ]
}
```

[HtmlWebpackPlugin]: https://github.com/jantimon/html-webpack-plugin