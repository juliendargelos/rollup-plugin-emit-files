"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
exports.default = ({ src, dest = '.', include = '**/*', exclude = [] }) => {
    const ignore = Array.isArray(exclude) ? exclude : [exclude];
    return {
        name: 'emit-files',
        async generateBundle() {
            const files = await fast_glob_1.default(include, { cwd: src, ignore });
            await Promise.all(files.map(file => (async () => this.emitFile({
                type: 'asset',
                fileName: path_1.default.join(dest, file),
                source: await fs_extra_1.default.readFile(path_1.default.join(src, file))
            }))()));
        }
    };
};
