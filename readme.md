# rollup-plugin-emit-files

This plugin allows you to emit files to rollup bundle.

## Install

```bash
yarn add rollup-plugin-emit-files --dev
```

or

```bash
npm install rollup-plugin-emit-files -D
```

## Usage

```javascript
// rollup.config.js

import emitFiles from 'rollup-plugin-emit-files'

export default {
  // ...
  plugins: [
    emitFiles({ src: 'static' })
  ]
}
```

## Options

```typescript
{
  src: string
  dest?: string
  include?: string | string[]
  exclude?: string | string[]
}
```

### src

Source directory to find files from.

Required

### dest

Relative path from bundle location where to output files.

Default: `'.'`

### include

Glob or array of globs defining which files to include.

Default: `'**/*'`
  
### exclude

Glob or array of globs defining which files to exclude.

Default: `[]`
