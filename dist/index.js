'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs-extra'));
var path = _interopDefault(require('path'));
var glob = _interopDefault(require('fast-glob'));

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
