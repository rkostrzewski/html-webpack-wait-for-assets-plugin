'use strict';

var fs = require('fs');

function HtmlWebpackWaitForAssetsPlugin(options) {
	options = options || {};
	this.assets = options.assets || [];
	this.timeout = options.timeout || 10000;
}

HtmlWebpackWaitForAssetsPlugin.prototype.apply = function (compiler) {
	var self = this;

	compiler.plugin('compilation', function (compilation) {
		compilation.plugin('html-webpack-plugin-before-html-generation', function (htmlPluginData, callback) {
			self.waitForAssets(compilation, callback);
		});
	});
};

HtmlWebpackWaitForAssetsPlugin.prototype.waitForAssets = function (compilation, callback) {
	var self = this;
	Promise.all(this.assets.map(function (path) {
		return self.waitForAsset(path, self.timeout);
	})).then(function () {
		callback();
	}).catch(function (err) {
		callback(err);
	});
};

HtmlWebpackWaitForAssetsPlugin.prototype.waitForAsset = function (path, timeout) {
	return new Promise(function (resolve, reject) {
		fs.stat(path, function (err) {
			if (!err) {
				resolve();
			}
			fs.watchFile(path, function (curr) {
				if (curr.size) {
					resolve();
				}
			});
			setTimeout(function () {
				reject('Waiting for ' + path + ' timed out after ' + timeout + ' ms.');
			}, timeout);
		});
	});
};

module.exports = HtmlWebpackWaitForAssetsPlugin;
