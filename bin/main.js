#!/usr/bin/env node
const path = require('path')
const program = require('commander')
const makeIcon = require('./makeIcon')


program
  .version('v0.1.0')
  .option('-i, --input [path=./shape.svg]', '字符 SVG 路径', './shape.svg')
  .option('-o, --output [folder|path=./]', '字体输出目录或路径', './')
  .option('-l, --min [integer=32]', '字符集最小值', parseInt, 32)
  .option('-g, --max [integer=126]', '字符集最大值', parseInt, 126)
  .parse(process.argv)


const {input, min, max} = program
const name = input.replace(/^.*?([^/]+)\.svg$/, '$1')
const output = program.output.endsWith('.woff')
  ? program.output
  : path.resolve(program.output, 'text-security-' + name + '.woff')
const unicode = []
for (let i = min, char; i <= max; i++) {
  char = String.fromCharCode(i)
  unicode.push(char)
}

makeIcon({
  input,
  output,
  name,
  unicode
})
