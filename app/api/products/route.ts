import products from "@/data/assignment_list.json";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

interface QueryProductsArgs {
  page: number;
  limit: number;
}

const resolvers = {
  Query: {
    products: (_: any, { page, limit }: QueryProductsArgs) =>
      products.data.dataList.slice(page * limit, (page + 1) * limit),
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
    brandNo: Int
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
    products(page: Int, limit: Int): [Product]
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
