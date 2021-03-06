"use strict";

var webpack = require("webpack");

module.exports = {
    "entry": "./src/index.js",
    "devtool": "eval-source-map",
    "module": {
        "loaders": [
            {
                "loader": "strict-loader"
            }
        ]
    },
    "output": {
        "filename": "./dist/dist.js",
        "library": "game"
    },
    "watch": true,
    "watchOptions": {
        "aggregateTimeout": 100
    },
	"plugins": []
};
