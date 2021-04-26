declare interface ApartmentDataOption {
  /** 标题 */
  title: string;
  /** 链家主页 */
  url: string;
  /** 户型图 */
  blueprint: string;
  /** 面积 */
  size: number;
  /** 均价 */
  averavePrize: number;
  /** 总价 */
  totalPrize: number;
  /** 年份 */
  age: number;
  /** 楼层 */
  storey?: number | string;
  /** 朝向 */
  orientation?: string;
  /** 评论 */
  comment?: string;
  /** 小区 */
  community: string;

  score: ApartmentDataScore;
}

declare interface ApartmentDataScore {
  /** 户型 */
  style: dataOption;
  /** 质量 */
  quality: dataOption;
  /** 年份 */
  age: dataOption;
  /** 朝向 */
  orientation: dataOption;
  /** 光线 */
  light: dataOption;
  /** 通风 */
  air: dataOption;
  /** 风水 */
  geomancy?: dataOption;
}
