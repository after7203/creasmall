"use client";

import Dropdown from "@/components/dropdown";
import Header from "@/components/header";
import Product from "@/components/product";
import { TypeProduct } from "@/types";
import { useEffect, useState } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { applyCategory } from "@/store";

export default function Home() {
  const category = useReactiveVar(applyCategory);
  const [map_brand, setmap_brand] = useState<Map<string, string>>(
    new Map<string, string>([["전체", "all"]])
  );
  const [brandNo, setbrandNo] = useState<string>(
    Array.from(map_brand.values())[0]
  );
  const map_color = new Map([
    ["전체", "all"],
    ["검정색", "BK"],
    ["흰색", "WH"],
    ["보라색", "VI"],
    ["빨간색", "RD"],
    ["파란색", "BL"],
    ["초록색", "GR"],
  ]);
  const [colorCode, setcolorCode] = useState<string>(
    Array.from(map_color.values())[0]
  );
  const map_season = new Map([
    ["전체", "all"],
    ["봄", "1"],
    ["여름", "2"],
    ["가을", "3"],
    ["겨울", "4"],
    ["FREE", "5"],
  ]);
  const [seasonCode, setseasonCode] = useState<string>(
    Array.from(map_season.values())[0]
  );
  const map_sort = new Map([
    ["신상품순", "new"],
    ["낮은 가격순", "low"],
    ["높은 가격순", "high"],
    ["판매 인기순", "popular"],
  ]);
  const [sort, setsort] = useState<string>(Array.from(map_sort.values())[0]);

  const GET_PRODUCTS = gql`
    query GetProducts(
      $genderCode: String
      $brandNo: String
      $colorCode: String
      $seasonCode: String
      $sort: String
    ) {
      products(
        genderCode: $genderCode
        brandNo: $brandNo
        colorCode: $colorCode
        seasonCode: $seasonCode
        sort: $sort
      ) {
        thumbnail1
        thumbnail2
        goodsName
        brandName
        brandNo
        benefitPrice
        tagPrice
        sizeInfo
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      genderCode: category.value,
      brandNo,
      colorCode,
      seasonCode,
      sort,
    },
  });

  useEffect(() => {
    if (!loading) {
      console.log(data);
    }
    if (!loading && data) {
      (data.products as TypeProduct[]).forEach((product) =>
        map_brand.set(product.brandName, product.brandNo)
      );
      setmap_brand(map_brand);
    }
  }, [loading]);

  if (error) console.log(console.log(JSON.stringify(error, null, 2)));

  return (
    <>
      <Header />
      <main className="px-16 py-10">
        <div className="mb-16 flex justify-center space-x-3 text-3xl">
          <div>{category.label}</div>
          <div className="text-stone-300">{">"}</div>
          <div>전체</div>
        </div>
        <section className="relative z-10 mb-10">
          <ul className="flex">
            <li className="flex-1">
              <Dropdown
                default_name="브랜드"
                map={map_brand}
                setter={setbrandNo}
              />
            </li>
            <li className="flex-1">
              <Dropdown
                default_name="색상"
                map={map_color}
                setter={setcolorCode}
              />
            </li>
            <li className="flex-1">
              <Dropdown
                default_name="시즌"
                map={map_season}
                setter={setseasonCode}
              />
            </li>
            <li className="flex-1">
              <Dropdown
                default_name="신상품순"
                map={map_sort}
                setter={setsort}
              />
            </li>
          </ul>
        </section>
        <section>
          <ul className="grid grid-cols-4 gap-x-8 gap-y-32 max-[768px]:grid-cols-2">
            {!loading &&
              data &&
              (data.products as TypeProduct[]).map((product) => (
                <li className="" key={product.goodsCode}>
                  <Product product={product} />
                </li>
              ))}
          </ul>
        </section>
      </main>
    </>
  );
}
