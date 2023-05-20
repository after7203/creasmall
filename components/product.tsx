"use client";

import { TypeProduct } from "@/types";
import Image from "next/image";

interface props {
  product: TypeProduct;
}

const Product = ({ product }: props) => {
  return (
    <div className="break-keep hover:cursor-pointer">
      <div className="group relative mb-7 aspect-square">
        <Image
          src={"https:" + product.thumbnail1}
          fill
          className={`!h-auto object-contain duration-1000 group-hover:opacity-0`}
          alt={product.goodsName}
        />
        <Image
          src={"https:" + product.thumbnail2}
          fill
          className={`!h-auto object-contain opacity-0 duration-1000 group-hover:opacity-100`}
          alt={product.goodsName}
        />
      </div>
      <div className="mb-3 text-xs text-gray-400">{product.brandName}</div>
      <div className="mb-7 whitespace-normal text-sm">{product.goodsName}</div>
      <div className="mb-6 flex space-x-2">
        <strong>{product.benefitPrice.toLocaleString("kr") + "원"}</strong>
        {product.dcRate !== 0 && (
          <strong className="text-stone-300">
            {product.tagPrice.toLocaleString("kr") + "원"}
          </strong>
        )}
      </div>
      {/* <div className="text-xs text-stone-400">{product.sizeInfo && "라스트피스"}</div> */}
    </div>
  );
};

export default Product;
