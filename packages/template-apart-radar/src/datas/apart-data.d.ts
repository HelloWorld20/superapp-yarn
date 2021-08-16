/**
 * 房源具体数据声明
 */

declare interface ApartmentDataOption {
  /** 标题 */
  title: string;
  /** 链家主页 */
  url: string;
  /** 户型图 */
  blueprint: string;
  /** 面积 */
  size: string;
  /** 均价 */
  averavePrize: string;
  /** 总价 */
  totalPrize: string;
  /** 年份 */
  age: string;
  /** 楼层 */
  storey?: string | number;
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
  /** 嘈杂度 */
  noise: dataOption;
  /** 视野：阳台、窗户的视野 */
  view: dataOption;
  /** 风水 */
  geomancy?: dataOption;
}
