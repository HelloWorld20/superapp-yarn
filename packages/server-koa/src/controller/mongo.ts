import * as Router from "@koa/router";
// import RES from '../utils/service-error'

const router = new Router();

router.get("/get", async (ctx, next) => {
  const collection = ctx.mongo.db("admin").collection("temps");
  const condition = {
    age: 20,
  };

  try {
    const info = await collection.find(condition).toArray();
    console.log("/////////////////////////////////");
    console.log(info);
    ctx.status = 200;
    ctx.body = { data: info };
  } catch (error) {
    console.log(error);

    throw new Error(error as any);
  }

  await next();

  // throw RES.GENERAL.SERVER_ERROR;
});

router.get("/set", async (ctx, next) => {
  const collection = ctx.mongo.db("admin").collection("temps");
  const condition = {
    id: "123",
  };

  collection.update(condition, {
    extra: Math.random(),
  });
  ctx.status = 200;
  ctx.body = { data: "ok" };
  await next();

  // ctx.throw(400, "name require");
});

export default router;

// async function get_gold(ctx) {
//   moment.locale('zh-cn');
//   const collection = ctx.mongo.db('hsfm').collection('info');
//   const condition = {
//       uid: ctx.state.uid
//   };
//   const period = Period.calc(ctx.state.config.period_suffix_map);
//   const period_gold_total = `gold_total_${period}`;
//   const period_level = `level_${period}`;

//   let info = await collection.find(condition).toArray();

//   // 找不到数据
//   if(info.length == 0) {
//       throw RES.BASIC.NO_USER;
//   }
//   // 已到期
//   if(new Date(info[0].get_gold_time).getTime() > new Date().getTime()) {
//       throw RES.BASIC.NOT_ALLOW_GOLD(info[0].get_gold_time);
//   }

//   const collect_gold_num = ctx.state.config.collect_gold_num;
//   const added_gold_total = info[0][period_gold_total] + collect_gold_num;
//   // 更新
//   const next_get_gold_time = moment().add(ctx.state.config.collect_gold_gap, 'second').format('YYYY-MM-DD HH:mm:ss');

//   let $inc = {
//       gold: collect_gold_num
//   };
//   $inc[period_gold_total] = collect_gold_num;
//   let $set = {
//       get_gold_time: next_get_gold_time,
//   }
//   $set[period_level] = calc_level(ctx.state.config.level_map, added_gold_total);

//   let result = await collection.update(condition, {
//       $inc,
//       $set
//   });

//   // 更新失败
//   if(result.result.nModified != 1) {
//       throw RES.GENERAL.DB_ERROR;
//   }

//   ctx.status = 200;
//   ctx.body = {data: next_get_gold_time};

// }
