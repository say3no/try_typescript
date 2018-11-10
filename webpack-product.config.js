/* webpackを読み込みます */
var webpack = require('webpack');
module.exports = {
    entry: "./src/Hello.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // デバッグ用にソースマップの出力を有効に
    devtool: "source-map",
    resolve: {
        // 解決可能な拡張子として、".ts"と".tsx"を追加します
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rule: [
            // 拡張子が.tsと.tsxのファイルを `awsome-typescript-loader`で扱うようにする
            {
                test: /\.ts?$/,
                loader: "awesome-typescript-loader"
            },
            // 出力されるすべての .js ファイルは、 `source-map-loader` で
            // 再加工されたソースマップを持つ
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    // ===== For production =======
    /** プラグインの設定 */
    plugins: [
        /** DEfinePluginの実行 */
        new webpack.DefinePlugin({
            // process.env.NODE_ENVを'production'に置き換える
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        /** UglifyJsPluginの実行 */
        new webpack.optimize.minimize({
            compress: {
                // 圧縮するときに警告を除去する
                warnings: false
            }
        })
    ],
};