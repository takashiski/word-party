const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: true,
    minify: false,
    splitting: false,
    platform: 'browser',
    format: 'iife',
    outfile: 'public/word-party.js',
    target: ['chrome80']
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: false,
    minify: true,
    splitting: false,
    platform: 'browser',
    format: 'iife',
    globalName: 'WordParty',
    target: ['esnext'],
    outfile: 'public/word-party.min.js',
    target: ['chrome80']
  })
  .catch(() => process.exit(1));

  esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: false,
    minify: false,
    splitting: false,
    platform: 'browser',
    format: 'esm',
    target: ['esnext'],
    outfile: 'public/word-party.esm.js',
    target: ['chrome80']
  })
  .catch(() => process.exit(1));
