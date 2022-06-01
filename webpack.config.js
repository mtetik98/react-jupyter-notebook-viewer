const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, "demo", "index.tsx"),
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
        library: "react-jupyter-notebook-viewer",
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "demo", "index.html"),
        }),
        new webpack.ProvidePlugin({
            process: "process/browser.js",
        }),
    ],
};
