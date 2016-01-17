module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "./public/build/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};