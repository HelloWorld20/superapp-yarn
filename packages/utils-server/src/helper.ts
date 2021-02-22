// import iconv from "iconv-lite";
// import Buffer from 'buffer'
const iconv = require('iconv-lite');
const Buffer = require("buffer");

export const GBK2Utf8 = (input: string): string => {
  const buff = Buffer.from(input, "GBK");
  const str = iconv.decode(buff, "gb2312");
  const newBuf = iconv.encode(str, "utf-8");
  return newBuf.toString();
};
