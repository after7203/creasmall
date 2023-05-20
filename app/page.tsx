"use client";

import Dropdown from "@/components/dropdown";
import Header from "@/components/header";
import Product from "@/components/product";
import { TypeProduct } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { applyCategory } from "@/store";

export default function Home() {
  const category = useReactiveVar(applyCategory);
  const [list_brand, setlist_brand] = useState<string[]>([]);
  const [brand, setbrand] = useState<string>("전체");
  const list_color = [
    "전체",
    "검정색",
    "흰색",
    "보라색",
    "빨간색",
    "파란색",
    "초록색",
  ];
  const [color, setcolor] = useState<string>("전체");
  const list_season = ["전체", "봄", "여름", "가을", "겨울", "FREE"];
  const [season, setseason] = useState<string>("전체");
  const list_sort = ["신상품순", "낮은 가격순", "높은 가격순", "판매 인기순"];
  const [sort, setsort] = useState<string>("신상품순");

  const GET_PRODUCTS = gql`
    query GetProducts {
      products {
        thumbnail1
        thumbnail2
        goodsName
        brandName
        benefitPrice
        tagPrice
        sizeInfo
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    console.log(data);
    if (!loading && data) {
      setlist_brand(
        Array.from(
          new Set(
            ["전체"].concat(
              (data.products as TypeProduct[]).map(
                (product) => product.brandName
              )
            )
          )
        )
      );
    }
  }, [loading]);
  
  if (error) return `Error! ${error}`;

  return (
    <>
      <Header />
      <main className="px-16 py-10">
        <div className="mb-16 flex justify-center space-x-3 text-3xl">
          <div>{category.toUpperCase()}</div>
          <div className="text-stone-300">{">"}</div>
          <div>전체</div>
        </div>
        <section className="relative z-10 mb-10">
          <ul className="flex">
            <li className="flex-1">
              <Dropdown
                default_name="브랜드"
                list={list_brand}
                state={brand}
                setter={setbrand}
              />
            </li>
            <li className="flex-1">
              <Dropdown
                default_name="색상"
                list={list_color}
                state={color}
                setter={setcolor}
              />
            </li>
            <li className="flex-1">
              <Dropdown
                default_name="시즌"
                list={list_season}
                state={season}
                setter={setseason}
              />
            </li>
            <li className="flex-1">
              <Dropdown
                default_name="신상품순"
                list={list_sort}
                state={sort}
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
