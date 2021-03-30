// import mongo from "ww-utils-server/src/mongodb";
// import * as mongoose from "mongoose";

// const model = {
//   from: String,
//   to: String,
//   fromName: String,
//   toName: String,
//   prise: Number,
//   depTime: Date,
//   arrTime: Date,
//   cheapAirline: Boolean,
//   flightNo: String,
//   id: String,
// };
// const schema = new mongoose.Schema(model);
// // const value = {
// //   from: "",
// //   to: "",
// //   fromName: "",
// //   toName: "",
// //   prise: "",
// //   depTime: "",
// //   arrTime: "",
// //   cheapAirline: false,
// //   flightNo: "",
// //   id: "",
// // };
// const COLLECTION = "air-tickets";

// export const insert = async (value: any) => {
//   return mongo.insert(COLLECTION, schema, value);
// };

// export const find = async (condition?: any) => {
//   return mongo.find(COLLECTION, schema, condition);
// };

// export const del = async (condition: any) => {
//   return mongo.del(COLLECTION, schema, condition);
// };

// export const update = async (condition: any, value: Record<string, any>) => {
//   return mongo.update(COLLECTION, schema, condition, value);
// };
