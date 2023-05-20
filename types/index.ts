export type TypeProduct = {
  registerDate: string;
  displayOrder: number;
  goodsCode: string;
  goodsName: string;
  brandName: string;
  tagPrice: number;
  benefitPrice: number;
  dcRate: number;
  genderCode: string;
  goodsTagName: string;
  brandNo: number;
  sizeInfo: string;
  thumbnail1: string;
  thumbnail2: string;
  stockQuantity: number;
  orderCount: number;
  reviewCount: number;
  reviewScore: number;
  soldoutYn: "N";
  wishYn: "N";
  seasonCode: "1" | "2" | "3" | "4" | "5" | "6";
  colorCode: "BK" | "WH" | "VI" | "RD" | "BL" | "GR";
  soldQuantity: number;
};
