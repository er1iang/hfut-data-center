'use strict';

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    fs = require('fs'),
    staticResourcePath = path.join(__dirname, 'static'),
    srcPath = path.join(__dirname, 'src'),
    nodeModulesPath = path.join(__dirname, 'node_modules');

/**
 *  检测Webpack 编译命令中是否带有 NODE_ENV=production 参数
 带有 NODE_ENV=production 参数，意为：处于 发布环境 的编译；
 不带有 NODE_ENV=production 参数，意为：处于 测试环境 的编译。
 *  @author James lv
 *  @creatdate 2015-10-28T14:41:59+0800
 *  @return    {Boolean} true : 发布环境
 false: 测试环境
 */
var isProduction = function () {
    return process.env.NODE_ENV === 'production';
};

/**
 *  检查本地是否有 webpack.localconfig.js 文件
 *  @author James lv
 *  @creatdate 2015-10-28T16:46:58+0800
 *  @return    {Boolean} true : 存在webpack.localconfig.js 文件
 false: 不存在webpack.localconfig.js 文件
 */
var isExistsLocalconfig = function () {
    return fs.existsSync(path.join(__dirname, 'webpack.localconfig.js'));
};

/**
 *  Project config
 检查本地是否有 webpack.localconfig.js 文件，如果有，则使用localconfig 中的配置；
 否则，则使用默认配置。
 *  @type {Object}
 */
var Config = isExistsLocalconfig() ? require(path.join(__dirname, 'webpack.localconfig.js')) : {
    AjaxDomain: 'mobile.' + 'tonghs.me' //'angelcrunch.com'// tonghs.me
};

/**
 *  自定义环境变量plugin
 *  @type {
 *        __DEV__:      在module 中确定当前是否是测试环境；
                        一般使用 [if(__DEV__) foo();] 的方式调用；
                        在编译时，值为false 的无效if 语句，将被uglify插件擦除。
 *        __AjaxDomain: 在module 中确定当前环境的Ajax 路径；
                        使用 ［var Domain = __AjaxDomain;］ 的方式调用。
 *  }
 */
var defineStatePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),
    __AjaxDomain: JSON.stringify(Config.AjaxDomain)
});

/**
 *  指定多个库的min package 路径；
 在 发布环境 中，使用这些官方的发布环境库会去除掉 Warning 模块，
 减小编译后的bundle 体积。（当前会减小40-60KB）
 *  @type {Object}
 */
var modulePath = { // production
    React: path.join(nodeModulesPath, 'react/dist/react.min.js'),
    React_addons: path.join(nodeModulesPath, 'react/dist/react-with-addons.min.js'),
    React_Router: path.join(nodeModulesPath, 'react-router/umd/ReactRouter.min.js')
},
    moduleAlias = isProduction() ? { // production
    'react/addons': [modulePath.React_addons],
    'react': [modulePath.React],
    'react-router': [modulePath.React_Router],
    // static resources
    'static': staticResourcePath
} : {
    // static resources
    'static': staticResourcePath
},
    noParse = isProduction() ? [modulePath.React, modulePath.React_addons
// modulePath.React_Router   // *Note: You can't put 'modulePath.React_Router' to noParse
] : [];

/**
 *  Webpack compilation config
 *  @author James lv
 *  @creatdate 2015-10-28T14:59:40+0800
 *  @type {Object}
 */
module.exports = {
    target: 'web',
    cache: true,
    entry: {
        module: path.join(srcPath, 'module.js'),
        common: ['jquery', 'react', 'react-router', 'alt', 'react-mixin', 'utils/titleHelper']
    },
    /**
     *  Webpack 解析bundle 中请求的module 路径时的设置
     *  @type {Object}
     */
    resolve: {
        root: srcPath,
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'src'],
        alias: moduleAlias
    },
    /**
     *  Webpack bundle 的输出设置
     详情见于 https://webpack.github.io/docs/configuration.html#output-chunkfilename
     *  @type {Object}
     */
    output: {
        path: path.join(__dirname, 'tmp'),
        publicPath: '/',
        filename: 'app/[name].[chunkhash].js',
        chunkFilename: 'modules/[name].[chunkhash].js',
        library: ['Example', '[name]'],
        pathInfo: true
    },

    /**
     *  Webpack loaders
     *  @type {Object}
     */
    module: {
        loaders: [{ test: /\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory' }, { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }, { test: /\.css$/, loader: 'style!css' }, {
            test: /.*\.(png|gif|svg)$/i,
            loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']
        }, {
            test: /\.(jpg)$/,
            loader: 'url?limit=25000'
        }, {
            test: /\.(woff|ttf)$/,
            loader: 'url?limit=100000'
        }],
        noParse: noParse
    },
    /**
     *  Config to node-sass
     *  @type {Object}
     */
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./static")]
    },

    plugins: [new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    /**
     *  将bundle 注入到html 文件上的plugin
     *  @type {Object}
     */
    new HtmlWebpackPlugin({
        inject: true,
        excludeChunks: ['test'],
        template: 'src/index.html'
    }), new webpack.optimize.UglifyJsPlugin({
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        },
        compress: {
            warnings: false
        }
    }), new webpack.NoErrorsPlugin(),
    /**
     *  调用自定义环境变量plugin
     */
    defineStatePlugin],
    debug: isProduction() ? false : true,
    devtool: isProduction() ? '' : 'eval-cheap-module-source-map',
    devServer: {
        port: 9090,
        contentBase: './tmp',
        historyApiFallback: true
    }
};

//# sourceMappingURL=webpack.config-compiled.js.map