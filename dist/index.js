'use strict';

var fs = require('fs-extra');
var path = require('path');
var glob = require('fast-glob');

var index = ({ src, dest = '.', include = '**/*', exclude = [] }) => {
    const ignore = Array.isArray(exclude) ? exclude : [exclude];
    return {
        name: 'emit-files',
        async generateBundle() {
            const files = await glob(include, { cwd: src, ignore });
            await Promise.all(files.map(file => (async () => this.emitFile({
                type: 'asset',
                fileName: path.join(dest, file),
                source: (await fs.readFile(path.join(src, file))).toString()
            }))()));
        }
    };
};

module.exports = index;
