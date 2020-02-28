cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-snackbar.MaterialSnackbar",
      "file": "plugins/cordova-plugin-snackbar/www/materialSnackbar.js",
      "pluginId": "cordova-plugin-snackbar",
      "clobbers": [
        "cordova.plugins.snackbar"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-snackbar": "2.2.1"
  };
});