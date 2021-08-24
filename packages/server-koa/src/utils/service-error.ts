export enum ERROR_STATUS {
  "continue" = 100,
  "switching protocols" = 101,
  "processing" = 102,
  "ok" = 200,
  "created" = 201,
  "accepted" = 202,
  "non-authoritative information" = 203,
  "no content" = 204,
  "reset content" = 205,
  "partial content" = 206,
  "multi-status" = 207,
  "already reported" = 208,
  "im used" = 226,
  "multiple choices" = 300,
  "moved permanently" = 301,
  "found" = 302,
  "see other" = 303,
  "not modified" = 304,
  "use proxy" = 305,
  "temporary redirect" = 307,
  "permanent redirect" = 308,
  "bad request" = 400,
  "unauthorized" = 401,
  "payment required" = 402,
  "forbidden" = 403,
  "not found" = 404,
  "method not allowed" = 405,
  "not acceptable" = 406,
  "proxy authentication required" = 407,
  "request timeout" = 408,
  "conflict" = 409,
  "gone" = 410,
  "length required" = 411,
  "precondition failed" = 412,
  "payload too large" = 413,
  "uri too long" = 414,
  "unsupported media type" = 415,
  "range not satisfiable" = 416,
  "expectation failed" = 417,
  "I'm a teapot" = 418,
  "unprocessable entity" = 422,
  "locked" = 423,
  "failed dependency" = 424,
  "upgrade required" = 426,
  "precondition required" = 428,
  "too many requests" = 429,
  "request header fields too large" = 431,
  "internal server error" = 500,
  "not implemented" = 501,
  "bad gateway" = 502,
  "service unavailable" = 503,
  "gateway timeout" = 504,
  "http version not supported" = 505,
  "variant also negotiates" = 506,
  "insufficient storage" = 507,
  "loop detected" = 508,
  "not extended" = 510,
  "network authentication required" = 511,
}

export class ServiceError extends Error {
  code = "000000";
  status = ERROR_STATUS["service unavailable"];
  /**
   * 返回包装后的错误对象
   * @param  {ERROR_CODE} [status='500' ]   状态码
   * @param  {string} [msg='未知错误']        状态消息
   * @param  {string} [code='000000']        错误码，前后端自定义的错误码
   * @return {ServiceError}
   */
  constructor(
    // service = "service_code_1.default.UNKONWN",
    status = ERROR_STATUS["service unavailable"],
    msg = "未知错误",
    code = "000000"
  ) {
    super(msg);

    this.code = code;
    this.status = status;
    if (msg) {
      this.message = msg;
    }
  }
}
