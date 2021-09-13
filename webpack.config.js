const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: __dirname + "/src/index.ts",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
           }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: __dirname + "/build",
        filename: "index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "src/index.html", })
    ]
};
