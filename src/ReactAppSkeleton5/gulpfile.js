/// <binding AfterBuild='build-debug' Clean='clean' />
/// <binding AfterBuild='build-debug' />

var gulp = require("gulp");
var gutil = require("gulp-util");
var rimraf = require("rimraf");
var mocha = require('gulp-mocha');
var babel = require('babel-core/register');
var path = require('path');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
// Polyfill promises for old node versions (due to visual studio bundling an ancient version of it)
require('promise-es6').install();

var CONFIG_PRODUCTION = 0;
var CONFIG_DEVELOPMENT = 1;
var CONFIG_DEVELOPMENT_HOT = 2;

var project = require("./project.json");
var paths = {
	webroot: "./" + project.webroot + "/"
};
paths.jsDist = paths.webroot + 'js/dist/';
paths.jsSrc = paths.webroot + 'js/src/';
paths.bundle = paths.js + 'bundle.js';
paths.minifiedBundle = paths.js + 'bundle.min.js';

gulp.task("clean", function (cb) {
	rimraf(paths.jsDist, cb);
});

gulp.task('build', ['build-debug', 'build-release']);

gulp.task('build-debug', function (callback) {
	webpack(createWebpackConfig(CONFIG_DEVELOPMENT), function (err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString(createStatsConfig()));
		callback();
	});
});


gulp.task('build-release', function (callback) {
	webpack(createWebpackConfig(CONFIG_PRODUCTION), function (err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString(createStatsConfig()));
		callback();
	});
});

// Watch for changes and serve updated bundles on a dev server (localhost:1334).
// The client is set up to load both the compiled build and the build on the dev server
// Whatever is exported to `window` is replaced by the dev server version onLoad
gulp.task('hot-watch', function () {
	var config = createWebpackConfig(CONFIG_DEVELOPMENT_HOT);
	new WebpackDevServer(webpack(config), {
		hot: true,
		publicPath: config.output.publicPath,
		stats: createStatsConfig()
	}).listen(1334, 'localhost', function (err) {
		if (err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'Listening on port 1334');
	});
});

gulp.task('test', function () {
	return gulp.src(paths.jsSrc + '**/__tests__/*.js')
		.pipe(mocha({
			compilers: {
				js: babel
			},
			reporter: 'spec'
		}));
});
gulp.task('test:watch', function () {
	gulp.watch(['js/src/**'], ['test']);
})

gulp.task('open-in-atom', function () {
	var spawn = require('child_process').spawn;
	console.log(paths.webroot)
	spawn('cmd', ['/c', 'atom', './'], { cwd: paths.webroot });
	console.log('Don\'t forget to install the language-babel atom package');
});
gulp.task('open-in-explorer', function () {
	var spawn = require('child_process').spawn;
	spawn('explorer', ['.'], { cwd: process.cwd() });
});

var autoprefixer = require('autoprefixer');
function createWebpackConfig(type) {
	var config = {
		devtool: 'cheap-module-eval-source-map',
		entry: [
			paths.jsSrc + 'index'
		],
		output: {
			path: paths.jsDist,
			filename: 'bundle.js',
			publicPath: '/js/dist'
		},
		plugins: [
			new webpack.NoErrorsPlugin()
		],
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel',
					exclude: /node_modules/,
					query: {
						stage: 0,
						plugins: []
					}
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
				}
			]
		},
		postcss: [
			autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })
		]
	};

	if (type === CONFIG_DEVELOPMENT_HOT) {
		// Set up webpack development server path
		config.output.publicPath = 'http://localhost:1334/';

		// Include webpack development code in the javascript bundle
		config.entry.unshift(
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:1334/'
		);

		// Add the hot module replacement javascript transform
		config.plugins = [
			new webpack.HotModuleReplacementPlugin()
		];

		// Add the React hot reloading babel plugin
		config.module.loaders[0].query.plugins.push('react-transform');
		config.module.loaders[0].query.extra = {
			'react-transform': {
				transforms: [
					{
						transform: 'react-transform-hmr',
						imports: ['react'],
						locals: ['module']
					},
					{
						transform: 'react-transform-catch-errors',
						imports: ['react', 'redbox-react']
					}
				]
			}
		};

	} else if (type === CONFIG_PRODUCTION) {
		config.devtool = 'source-map';
		config.output.filename = 'bundle.min.js';

		// https://webpack.github.io/docs/list-of-plugins.html

		// Reduces file size by being clever in temp name assignments. Recommended plugin
		config.plugins.push(new webpack.optimize.OccurenceOrderPlugin(true));
		// Turns off React debug, allows minification to eliminate dead code
		config.plugins.push(new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production") } }));
		// Minification, massive reduction in file size
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, screw_ie8: true }));
	}

	return config;
}

function createStatsConfig() {
	return {
		colors: true,
		timings: true,
		chunkModules: false
	}
}

