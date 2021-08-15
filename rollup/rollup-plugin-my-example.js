export default function myExample () {
  return {
    name: "my-example", // 插件名称，在错误提示和警告中会用到
    resolveId(source, importee) { // 自定义一个解析器。解析器加载程序在定位第三方依赖项时非常有用。如果返回null或undefined，则将取决于其他resolveId函数(最终取决于默认的解析方式);返回false表示importee应被视为外部模块而不包括在bundle中。
      console.log(source, importee, 'resolveId')
    },
    renderChunk(code, { modules, exports, imports, fileName, isEntry }, outputOptions) { // 可以被用来改变每个chunk。为每个Rollup输出的chunk调用。 返回null 将不会发生任何改变。
      console.log(modules, 'renderChunk')
    },
    buildStart(v) { // 在每个rollup.rollup build之前被调用。
      console.log(v, 'buildStart')
    },
    footer(v) { // 一个字符串或者一个返回字符串或Promise的函数。
      console.log(v, 'footer')
    },
    options(inputOptions) { // 读取并替换或操作传递给rollup.rollup的options对象。 返回null不会替换任何内容。
      console.log(inputOptions, 'options')
    },
    buildEnd(error) { // 在rollup完成bundling之后，执行generate或者write之前被调用。你也可以返回一个Promise。如果在build的时候发生错误, 错误将会被传递到这个钩子.
      console.log(error, 'buildEnd')
    },
    generateBundle (outputOptions, bundle, isWrite) { // 在bundle.generate() 或者 bundle.write()之后被调用。bundle提供了正在编写或生成的文件的完整列表及其详细信息。
      console.log('generateBundle')
    },
    renderError(error) { // 在执行bundle.generate()或者bundle.write()的时候如果发生错误就会被调用。这个错误会被传入这个钩子。如果要在generation成功完成的时候得到通知, 可以使用generateBundle钩子。
      console.log(error, 'renderError')
    },
    transform(source, id) { // 可以被用来改变每个模块。在--watch模式中, 会监听dependencies数组中所有文件或者目录的变化。
      console.log(source, id, 'transform')
    },
    watchChange(file) { // 在--watch模式下，每当受监控的文件发生更改时，都会通知插件。
      console.log(file, 'watchChange')
    },
    load(id) { // 自定义一个loader。 如果返回null则将取决于其他load函数（最终取决于文件系统默认的加载的行为）
      if (id === 'virtual-module') {
        return 'export default "This is virtual!"' // "virtual-module"的源码
      }
      return null
    }
  }
}