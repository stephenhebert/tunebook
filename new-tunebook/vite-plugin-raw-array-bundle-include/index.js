import path from 'path'
import fs from 'fs'
import { createUnplugin } from 'unplugin'

const getFiles = function({dir, ext}) {
  const files = fs.readdirSync(dir)
  const fileList = []
  files.forEach((file) => {
    if (file.match(new RegExp(`\.${ext}$`))) fileList.push(path.join(dir, file))
  })
  return fileList
}

const getFileContents = function({ file, exportArray }) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, body) => {
      if (err) return reject(err)
      const fileName = file.substr(file.lastIndexOf('/') + 1)
      exportArray.push({
        fileName,
        body,
      })
      resolve()
    })
  })
}

export const unplugin = createUnplugin((options) => {
  const opts = { ...options } // test, path, or match?
  let assetsPath
  let relativePathMatch = /(.*?)\*\.(.*?)$/
  // watch: true or false
  // include: file regex to match
  // output: json file to output with default export

  return {
    name: 'vite-plugin-raw-array-bundle-include',
    // webpack's id filter is outside of loader logic,\
    

    buildStart() {

      // check options

      // [ 'js/*.js' ]
      if (!assetsPath) assetsPath = path.resolve('.', 'src/abc')
      this.addWatchFile(assetsPath) // this doesn't do anything yet
      const list = getFiles({ dir: assetsPath, ext: 'abc' })
      const exportArray = []
      list.forEach(async(file) => {
        this.addWatchFile(file)
      })
      const fileReadPromises = list.map(file => getFileContents({ file, exportArray }))
      Promise.all(fileReadPromises).then(() => {
        this.emitFile({
          type: 'asset',
          fileName: 'abc.js',
          source: `
          export default {
            data: ${JSON.stringify(exportArray)}
          }`,
        })
      })




      // const targetPath = path.resolve(rootDir, item)
      // if (fs.statSync(targetPath).isDirectory() && options.recursive) {
      //   globalStylePaths = globalStylePaths.concat(
      //     searchGlobalStyle(targetPath, options, data),
      //   )
      // } else {
      //   if (data.globalRegex.test(item)) {
      //     globalStylePaths.push(targetPath)
      //   }
      // }






    }

    // inject to index html https://github.com/originjs/origin.js/blob/main/packages/vite-plugin-global-style/src/index.ts#L101

    // add watch file 
    // load

    // emit file 


    // an additional hook is needed for better perf on webpack
    // transformInclude (id) {
    //   return id.endsWith('.vue')
    // },
    // just like rollup transform
    // transform (code) {
    //   return code.replace(/<template>/, `<template><div>Injected</div>`)
    // },
    // more hooks coming
  }
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
export const esbuildPlugin = unplugin.esbuild


// transform is used in an import
