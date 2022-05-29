const path = require("path");

module.exports = {
    mode: "production",
    entry: "./lib/index.tsx",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
        library: "react-jupyter-notebook-viewer",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                exclude: [/node_modules/],
                use: ["ts-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    externals: {
        react: "react",
    },
};
