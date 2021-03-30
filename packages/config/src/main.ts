/*
 * @Author: jianghong.wei
 * @Date: 2020-12-29 00:24:46
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2021-03-29 23:23:01
 */

import * as fs from "fs";

export default class Config {
  config: Record<string, any> = {};
  constructor(input: string | Record<string, any>) {
    if (typeof input === "string") {
      this.config = Config.loadJSON(input);
    } else {
      this.config = input;
    }
  }

  static loadJSON(filename: string) {
    try {
      const content = fs.readFileSync(filename, "utf8");
      return JSON.parse(content);
    } catch (error) {
      return {};
    }
  }

  static getInternally(conf: any, key: string) {
    const keys = key.split(".");
    let result = conf;
    for (const k of keys) {
      result = result[k];
      if (result == null) return null;
    }
    return result;
  }

  get(key: string): any {
    return Config.getInternally(this.config, key);
  }
}
