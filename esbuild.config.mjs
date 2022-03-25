import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { build as compile } from 'esbuild'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDevelopment = Boolean(process.argv.includes('--dev'))

if (fs.existsSync(path.resolve(__dirname, 'dist'))) {
  console.log('Cleaning up old build')
  fs.rm(path.resolve(__dirname, 'dist'), { recursive: true }, (err) => {
    if (err) console.log(err)
  })
}

try {
  await compile({
    entryPoints: ['./src/index.jsx'],
    bundle: true,
    outdir: 'dist/',
    publicPath: '/',
    entryNames: isDevelopment ? undefined : '[name].[hash]',
    metafile: true,
    target: [
      'safari11',
      'chrome64',
      'firefox58',
      'edge88',
    ],
    watch: isDevelopment
      ? {
        onRebuild(error) {
          if (error) console.error('Recompiling failed:\n', error)
          else console.log('Recompiled')
        },
      }
      : false,
    sourcemap: true,
    plugins: [
      htmlPlugin({
        files: [
          {
            entryPoints: ['/src/index.jsx'],
            filename: 'index.html',
            htmlTemplate: fs.readFileSync('./public/index.template.html'),
            // scriptLoading: 'defer',
          },
        ],
      }),
    ]
  })
} catch (e) {
  console.error(e)
  process.exit(1)
} finally {
  console.log('Compiled')
}
