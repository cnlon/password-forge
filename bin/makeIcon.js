const fs = require('fs')
const MemoryWritableStream = require('./MemoryWritableStream')
const SVGIcons2SVGFontStream = require('svgicons2svgfont')
const svg2ttf = require('svg2ttf')
const ttf2woff = require('ttf2woff')


function makeIcon ({
  input,
  output,
  name,
  unicode
}) {
  const options = {
    fontName: 'text-security-' + name
  }
  const fontStream = new SVGIcons2SVGFontStream(options)

  const svgFontWriteStream = new MemoryWritableStream()

  const svgShapeReadStream = fs.createReadStream(input)
  const metadata = {name, unicode}
  svgShapeReadStream['metadata'] = metadata

  svgFontWriteStream.on('finish', () => {
    const svgFont = svgFontWriteStream.toString()
    const ttfFont = svg2ttf(svgFont, {})
    const woffFont = ttf2woff(ttfFont.buffer, {})
    fs.writeFileSync(output, woffFont.buffer, 'utf-8')
  })

  fontStream.pipe(svgFontWriteStream)
  fontStream.end(svgShapeReadStream)
}


module.exports = makeIcon
