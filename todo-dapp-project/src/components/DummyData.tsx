interface IDummyData {
  creator: any,
  timestamp: number,
  message: string,
  limit: Date
}
// creator: any,
// timestamp: number,
// message: string,
// limit: number,

export const dummyData: IDummyData[] = [
  {
    creator: "0x4840AE6B4203a9f0f0628e5FBEFeff277248CB3A",
    timestamp: 20220908,
    message: "ダミー１",
    limit: new Date("2022-09-18"),
  },
  {
    creator: "0x6840AE6B4203a9f0f0628e5FBEFeff277248CB3A",
    timestamp: 20220909,
    message: "ダミー2",
    limit: new Date("2022-09-20"),
  },
  {
    creator: "0x5840AE6B4203a9f0f0628e5FBEFeff277248CB3A",
    timestamp: 20220910,
    message: "ダミー2",
    limit: new Date("2022-09-22"),
  },
  {
    creator: "0x4330AE6B4203a9f0f0628e5FBEFeff277248CB3A",
    timestamp: 20220912,
    message: "ダミー2",
    limit: new Date("2022-09-24"),
  },
]
