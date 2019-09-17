import fs from 'fs-extra'
import path from 'path'
import glob from 'fast-glob'
import { Plugin } from 'rollup'

export default ({
  src,
  dest = '.',
  include = '**/*',
  exclude = []
}: {
  src: string
  dest?: string,
  include?: string | string[]
  exclude?: string | string[]
}): Plugin => {
  const ignore = Array.isArray(exclude) ? exclude : [exclude]

  return {
    name: 'emit-files',

    async generateBundle() {
      const files = await glob(include, { cwd: src, ignore })

      await Promise.all(files.map(file => (async () => this.emitFile({
        type: 'asset',
        fileName: path.join(dest, file),
        source: await fs.readFile(path.join(src, file))
      }))()))
    }
  }
}
