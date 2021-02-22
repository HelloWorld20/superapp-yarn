// import * as db_air from "../db/air-tickets";
// import dayjs from "dayjs";

import axios from "axios";
import { GBK2Utf8 } from "ww-utils-server/src/helper";
// const axios = require('axios');
const dayjs = require("dayjs");

/**
 * 开始爬取所有
 */
export async function beginCrawl() {}

/**
 * 爬取单条航线
 */
export async function crawlSingleLine(
  depCity: string,
  arrCity: string,
  date: string
) {
  const FORMAT = "YYYY-MM-DD";
  const callback = "jsonp160";

  const url = `https://sjipiao.fliggy.com/searchow/search.htm?callback=${callback}&depCity=${depCity}&arrCity=${arrCity}&depDate=${dayjs(
    date
  ).format(FORMAT)}&_input_charset=utf-8`;

  const res = await axios.get(url, {
    headers: {
      authority: "sjipiao.fliggy.com",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      accept: "*/*",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-dest": "script",
      referer:
        "https://sjipiao.fliggy.com/flight_search_result.htm?searchBy=1280&ttid=seo.000000574&tripType=0&depCityName=%C9%F2%D1%F4&depCity=&arrCityName=%BD%D2%D1%F4&arrCity=&depDate=2021-01-30&arrDate=",
      cookie:
        "lid=mc%E7%BD%91%E5%90%A7%E8%9B%8B; cna=HYNcFBowg1YCAbcMZ5R41j4S; enc=GI%2FS5aeiP4gJMT8Hm4skV9q2qstUk5spLjgEyKWxz%2BMpRWgcMfs9mfyz%2FyJnac6qKQ47Bxqk7TxXp6PyVYbbZg%3D%3D; UM_distinctid=1743ee993993ac-035769ee5f05fa-3323766-144000-1743ee9939a7fc; xlly_s=1; sgcookie=Q2JWaJ%2BUzTdDUc47DGQb; t=4c76ba9938454b3471d769b24b5b35d7; tracknick=mc%5Cu7F51%5Cu5427%5Cu86CB; _tb_token_=ee13370e595be; cookie2=1149c01153462b598f1e4be501303e32; CNZZDATA30066717=cnzz_eid%3D1915901614-1598782697-https%253A%252F%252Fwww.fliggy.com%252F%26ntime%3D1608384785; x5sec=7b226174783b32223a226563656638363135363332343839333766383935383366383563333261313538434b695a2b503446454d654f76763349344d2f6f59686f4c4e7a67794d6a63774e6a49324f7a4d3d227d; isg=BFxc4iTRb7E-gRojgnksnsx4LXoO1QD_w2T4yTZchscqgf0LXuckjz5w4Ol5ezhX; l=eBINpcNgQLM8hbKKBO5a-urza77OfIdb8cNzaNbMiInca6MOwFw5UNQ2LKrWkdtxgtfYBetrJmGnARhMWfzLRAkDBeYChtb3b4p9-; tfstk=ctIcBQvLYZ8jbMLlRotfKtwjXM7caAU2GGSP4g1Ox3rhf7IJ3sAxz2zjH8AAiG31.",
    },
    responseType: "blob",
    transformResponse: [
      function (data) {
        return GBK2Utf8(data);
      },
    ],
  });

  const data = res.data.replace(`${callback}(`, "").slice(0, -3);

  console.log("respoinse:::::::::::", data.trim());

  return JSON.parse(data.trim());
}

/**
 * 爬取单条航班
 */
export async function crawlSingleAir() {}

/**
 * 保存航班数据
 */
function saveAir(data: {
  from: string;
  to: string;
  fromName: string;
  toName: string;
  prise: number;
  depTime: string;
  arrTime: string;
  cheapAirLine: boolean;
  flighNo: string;
  id: string;
}) {}

/**
 * 读取单条航班数据
 */
async function getAir() {}

/**
 * 条件查询所有航班票价
 */
async function getAll() {}

// export async function getMongo(condition: Record<string, any>) {
//     return db_test.find(condition);
//   }

//   export async function addMongo(age: string, name: string) {
//     db_test.insert({ age, name });
//     return name;
//   }

//   export async function delMongo(condition: Record<string, any>) {
//     return db_test.del(condition);
//   }

//   export async function updateMongo(
//     condition: Record<string, any>,
//     value: Record<string, any>
//   ) {
//     condition.age = Number(condition.age);
//     return db_test.update(condition, value);
//   }
