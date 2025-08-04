/*
 * @Author: yangzhenhong
 * @Date: 2025-06-09 09:28:19
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-06-12 09:37:17
 * @FilePath: \gfai-travel-web\.prettierrc.cjs
 * @Description:
 */

module.exports = {
  // 箭头函数参数括号配置 (always: 始终显示; avoid: 省略括号)
  arrowParens: 'avoid',
  // HTML 标签的右尖括号是否跟随在最后一行属性末尾
  bracketSameLine: false,
  // 对象字面量的括号之间是否打印空格
  bracketSpacing: true,
  // 是否格式化嵌入的代码片段
  embeddedLanguageFormatting: 'auto',
  // HTML 文件的空格敏感度
  htmlWhitespaceSensitivity: 'css',
  // 是否在文件顶部插入 @format 标记
  insertPragma: false,
  // JSX 中是否使用单引号
  jsxSingleQuote: false,
  // 每行最大字符数
  printWidth: 120,
  // 超出打印宽度的处理方式
  proseWrap: 'preserve',
  // 对象属性引号配置
  quoteProps: 'as-needed',
  // 是否只格式化包含特定注释的文件
  requirePragma: false,
  // 是否使用分号
  semi: true,
  // 是否使用单引号
  singleQuote: true,
  // 缩进空格数
  tabWidth: 2,
  // 尾随逗号配置
  trailingComma: 'es5',
  // 是否使用 tab 缩进
  useTabs: false,
  // Vue 文件中是否缩进 style 和 script 标签
  vueIndentScriptAndStyle: false,
  // 行尾换行符配置
  endOfLine: 'auto',
  // 针对特定文件的配置覆盖
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
        printWidth: 80,
      },
    },
  ],
};
