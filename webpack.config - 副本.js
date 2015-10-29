var webpack = require('webpack');
var glob = require('glob');

function getEntry() {
    var entry = {};
    glob.sync(__dirname + '/dev/*.main.js').forEach(function (name) {
        var n = name.match(/([^/]+?)\.main\.js/)[1];

        entry[n] = './' + n + '.main.js';
    });

    return entry;
}

module.exports = {
    refreshEntry: function () {
        this.entry = getEntry();
    },
    context: __dirname + '/dev/',
    entry: getEntry(),
    resolve: {
        modulesDirectories: [
            'node_modules',
            'lib'
        ]
    },
    output: {
        path: __dirname + '/dest',
        filename: '[name].min.js'
    }
};
