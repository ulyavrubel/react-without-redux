const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AsyncChunkNamesPlugin = require('webpack-async-chunk-names-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const dirname = path.resolve(path.dirname(''));

const settings = {
    distPath: path.join(dirname, 'dist'),
    srcPath: path.join(dirname, 'src')
};

function srcPathExtend(subpath) {
    return path.join(settings.srcPath, subpath);
}

module.exports = () => {
    return {
        entry: settings.srcPath,
        output: {
            path: settings.distPath,
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].js',
            publicPath: '/'
        },
        devServer: {
            historyApiFallback: true
        },
        module: {
            rules: [
                // {
                //     enforce: 'pre',
                //     test: /\.js$/,
                //     exclude: /node_modules/,
                //     loader: 'eslint-loader'
                // },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.s?[ac]ss$/i,
                    use: [
                        {
                            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    exclude: [/images/],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts'
                        }
                    }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    exclude: [/fonts/],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets/images'
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [new CssMinimizerPlugin()],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'all',
                        test: /node_modules/,
                        priority: 20
                    },

                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'all',
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new AsyncChunkNamesPlugin(),
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: srcPathExtend('public'),
                        to: settings.distPath
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                path: settings.distPath,
                filename: '[name].[hash].css',
                publicPath: '/'
            }),
            new StylelintPlugin()
        ]
    };
};
