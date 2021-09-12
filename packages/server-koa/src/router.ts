import test from "./controller/test";
import mongo from "./controller/mongo";

export default {
  "/abc": test,
  "/mongo": mongo,
};
