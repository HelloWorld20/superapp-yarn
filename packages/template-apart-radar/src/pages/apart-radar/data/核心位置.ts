export interface MainDistrict {
  name: string;
  type: Array<"business" | "shopping" | "transport" | "park">;
  lng: number;
  lat: number;
  value: number;
  desc?: string;
}
export const mainDistrict: MainDistrict[] = [
  {
    name: "花城广场",
    type: ["business"],
    lng: 113.324661,
    lat: 23.120434,
    value: 100,
  },
  {
    name: "体育西",
    type: ["shopping"],
    lng: 113.322693,
    lat: 23.131969,
    value: 100,
  },
  {
    name: "广州塔",
    type: ['park'],
    lng: 113.324463,
    lat: 23.10647,
    value: 0,
  },
  {
    name: "广州南站",
    type: ['transport'],
    lng: 113.269325,
    lat: 22.988558,
    value: 0,
  },
  {
    name: "广州东站",
    type: ['transport'],
    lng: 113.324585,
    lat: 23.150587,
    value: 0,
  },
  {
    name: '机场',
    type: ['transport'],
    lng: 113.309402,
    lat: 23.39032,
    value: 0,
  },
  {
    name: "琶醍互联网中心",
    type: ['business'],
    lng: 113.338699,
    lat: 23.107502,
    value: 0,
  },
  {
    name: "金融城",
    type: ['business'],
    lng: 113.3822,
    lat: 23.1149,
    value: 0,
  },
  {
    name: "北京路",
    type: ['shopping', 'park'],
    lng: 113.269852,
    lat: 23.11841,
    value: 0,
  },
  {
    name: "上下九",
    type: ['shopping', 'park'],
    lng: 113.246178,
    lat: 23.113878,
    value: 0,
  },
];
