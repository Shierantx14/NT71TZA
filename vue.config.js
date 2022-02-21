const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
  pwa: {
    name: 'Natsu Spotify',
    themeColor: '#469FD1',
    msTileColor: '#35B9BA'
  }
})
