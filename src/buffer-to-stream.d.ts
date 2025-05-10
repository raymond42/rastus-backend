declare module 'buffer-to-stream' {
  import { Readable } from 'stream';
  function toStream(buffer: Buffer): Readable;
  export = toStream;
}
