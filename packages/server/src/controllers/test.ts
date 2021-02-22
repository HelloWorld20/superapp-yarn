import { createRouter, response, catchError } from "ww-utils-server/src";
import * as testSrv from "../services/test";
import tockenProxy from "ww-utils-server/src/tocken-proxy";

const router = createRouter();

router.get(
  "/",
  catchError(async (req, res, next) => {
    const tocken = await tockenProxy.getTocken();
    response.json(res, tocken);
  })
);

router.get(
  "/redis",
  catchError(async (req, res, next) => {
    const result = await testSrv.getRedis(req.query.key as string);
    response.json(res, `key=${req.query.key}, result=${result}`);
  })
);

router.post(
  "/redis",
  catchError(async (req, res, next) => {
    await testSrv.setRedis(req.query.key as string, req.body.value);
    response.json(res, "results");
  })
);
////////////////////////////////////////////////
// 查
router.get(
  "/mongo",
  catchError(async (req, res) => {
    const result = await testSrv.getMongo(req.query);
    response.json(res, result);
  })
);
// 改
router.post(
  "/mongo",
  catchError(async (req, res) => {
    const result = await testSrv.updateMongo(req.query, req.body);
    response.json(res, result);
  })
);
// 删
router.delete(
  "/mongo",
  catchError(async (req, res) => {
    const result = await testSrv.delMongo(req.query);
    response.json(res, result);
  })
);
// 增
router.put(
  "/mongo",
  catchError(async (req, res) => {
    const { age, name } = req.query;
    const result = await testSrv.addMongo(age as string, name as string);
    response.json(res, result);
  })
);
export default router;
