const stream = require('stream')


class MemoryWritableStream extends stream.Writable {
  constructor () {
    super()
    this.buffer = []
  }

  _write (chunk, encoding, callback) {
    this.buffer.push(chunk)
    callback()
  }

  toString () {
    return this.buffer.join('')
  }
}


module.exports = MemoryWritableStream
