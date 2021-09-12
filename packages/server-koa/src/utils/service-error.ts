import * as Boom from "boom";

/**
 * 这里写的是应用中所有的返回值：
 * 两种写法：
 *
 * 1. 正常的返回（HTTP 状态码默认 200）：
 *  get OK () {
 *    return {
 *      code: '0',
 *      msg: 'ok'
 *    }
 *  }
 *
 * 2. 错误的返回：
 *  get ERROR () {
 *    return new Boom('服务器错误', {
 *      statusCode: 500,
 *      data: {
 *        code: '1'
 *      }
 *    })
 *  }
 */
const ERR = {
  GENERAL: {
    get OK() {
      return {
        // code: '0',
        msg: "ok",
      };
    },

    get PARAM_ERROR() {
      return Boom.badRequest("参数错误", {
        code: "1",
      });
    },

    get SERVER_ERROR() {
      return Boom.badImplementation("服务器错误", {
        code: "2",
      });
    },

    get DB_ERROR() {
      return Boom.serverUnavailable("数据库错误", {
        code: "3",
      });
    },

    get NOT_FOUND() {
      return Boom.notFound("未找到页面");
    },
  },

  USER: {
    get SHARED_ALREADY() {
      return {
        code: "0001",
        msg: "已经分享过了，无法添加生命",
      };
    },

    get NOT_FOUND() {
      return Boom.notFound("找不到用户", {
        code: "0002",
      });
    },

    get UNAUTHORIZED() {
      // Boom.unauthorized 不能达到应用的返回值需求，需要手动创建
      return new Boom("未登录", {
        statusCode: 401,
        data: {
          code: "0003",
        },
      });
    },

    get FORBIDDEN() {
      return new Boom("无权限", {
        statusCode: 403,
        data: {
          code: "0004",
        },
      });
    },

    get INVALID_PWD() {
      return Boom.badRequest("密码错误", {
        code: "0005",
      });
    },
  },

  INVITATION: {
    get NOT_FOUND() {
      return Boom.notFound("邀请码无效", {
        code: "0100",
      });
    },

    get USED() {
      return Boom.conflict("用户已使用这一邀请码", {
        code: "0101",
      });
    },

    get TRY_USING_OWN_CODE() {
      return Boom.conflict("不能使用自己的邀请码", {
        code: "0102",
      });
    },

    get NOT_GENERATED() {
      return Boom.badImplementation("邀请码还没生成", {
        code: "0103",
      });
    },
  },
  UPLOAD: {
    get FAILED() {
      return Boom.serverUnavailable("文件上传服务出错", {
        code: "0201",
      });
    },
  },
  BASIC: {
    get NO_USER() {
      return Boom.notFound("找不到用户", {
        code: "-99",
      });
    },
    get NOT_FOUND() {
      return Boom.notFound("无数据", {
        code: "-1",
      });
    },

    get NO_LIFE() {
      return Boom.notAcceptable("生命值不足", {
        code: "-1",
      });
    },
    get NO_REDPACK() {
      return Boom.notAcceptable("红包不足", {
        code: "0300",
      });
    },
  },
  GAME: {
    get GAME_END() {
      return Boom.notAcceptable("当前这轮游戏已结束", {
        code: "-1",
      });
    },
    get ALLREADY_SEND() {
      return Boom.notAcceptable("已获取过题目", {
        code: "-2",
      });
    },
  },
};

export default ERR;
