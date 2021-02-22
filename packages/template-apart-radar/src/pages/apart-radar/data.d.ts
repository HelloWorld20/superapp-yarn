interface dataOption {
  data: number;
  desc?: string;
}

declare interface ApartScoreOption {
  /** 交通 */
  transport: dataOption;
  /** 环境 */
  enviranment: dataOption;
  /** 学区 */
  education: dataOption;
  /** 质量 */
  quality: dataOption;
  /** 房龄 */
  age: dataOption;
  /** 户型 */
  style: dataOption;
  /** 升值空间 */
  appreciation: dataOption;
  /** 配套设施 */
  equipment: dataOption;
  /** 性价比 */
  prise: dataOption;
}

declare interface ApartmentData {
  /** 名称 */
  name: string;
  /** 单价 */
  prise: number;
  /** 总价 */
  totalPrise: number;
  /** 行政区 */
  zone: string;
  /** 区域地段 */
  district: string;
  /** 优点描述 */
  advantage: string;
  /** 缺点描述 */
  disadvatage: string;
  /** 经度 */
  lng: number;
  /** 纬度 */
  lat: number;
  /** 展示字段 */
  score: ApartScoreOption;
}
