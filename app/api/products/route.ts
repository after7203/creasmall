import products from "@/data/assignment_list.json";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

interface QueryProductsArgs {
  genderCode: string;
  brandNo: string;
  colorCode: string;
  seasonCode: string;
  sort: string;
  search: string;
}

const resolvers = {
  Query: {
    products: (
      _: any,
      {
        genderCode,
        brandNo,
        colorCode,
        seasonCode,
        sort,
        search,
      }: QueryProductsArgs
    ) =>
      products.data.dataList
        .filter(
          (el) =>
            (genderCode === "all" || el.genderCode === genderCode) &&
            (brandNo === "all" || el.brandNo === brandNo) &&
            (colorCode === "all" || el.colorCode === colorCode) &&
            (seasonCode === "all" || el.seasonCode === seasonCode) &&
            (el.brandName.includes(search) ||
              el.goodsName.includes(search) ||
              el.goodsCode.includes(search))
        )
        .sort((a, b) => {
          if (sort === "new") {
            return a.registerDate < b.registerDate
              ? 1
              : a.registerDate > b.registerDate
              ? -1
              : 0;
          } else if (sort === "low") {
            return a.benefitPrice - b.benefitPrice;
          } else if (sort === "high") {
            return -(a.benefitPrice - b.benefitPrice);
          } else if (sort === "popular") {
            return -(a.soldQuantity - b.soldQuantity);
          } else {
            return 0;
          }
        }),
  },
};

const typeDefs = gql`
  type Product {
    registerDate: String
    displayOrder: Int
    goodsCode: String
    goodsName: String
    brandName: String
    tagPrice: Int
    benefitPrice: Int
    dcRate: Float
    genderCode: String
    goodsTagName: String
    brandNo: String
    sizeInfo: String
    thumbnail1: String
    thumbnail2: String
    stockQuantity: Int
    orderCount: Int
    reviewCount: Int
    reviewScore: Int
    soldoutYn: String
    wishYn: String
    seasonCode: String
    colorCode: String
    soldQuantity: Int
  }
  type Query {
    products(
      genderCode: String
      brandNo: String
      colorCode: String
      seasonCode: String
      sort: String
      search: String
    ): [Product]
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
