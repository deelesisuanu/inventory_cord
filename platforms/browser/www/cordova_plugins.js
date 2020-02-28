cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-snackbar/www/materialSnackbar.js",
        "id": "cordova-plugin-snackbar.MaterialSnackbar",
        "pluginId": "cordova-plugin-snackbar",
        "clobbers": [
            "cordova.plugins.snackbar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-snackbar": "2.2.1"
}
// BOTTOM OF METADATA
});