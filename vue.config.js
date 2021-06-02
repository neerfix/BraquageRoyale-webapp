const manifestJSON = require('./public/manifest.json')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './service-worker.js',
    },
  },
}
