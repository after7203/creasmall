import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { applyCategory, applySearch } from "@/store";
import Modal, { Styles } from "react-modal";
import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["900"],
  style: ["italic", "normal"],
});

const Header = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const modalStyles: Styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      zIndex: 20,
    },
    content: {
      top: "72.5px",
      left: "53%",
      right: "auto",
      bottom: "auto",
    },
  };
  const search = useReactiveVar(applySearch);
  const map_category = new Map([
    ["ALL", "all"],
    ["MALE", "M"],
    ["FEMALE", "F"],
    ["UNISEX", "Z"],
    ["ACCESSORY", "A"],
  ]);
  return (
    <header className="w-full px-16 py-8">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setmodalIsOpen(false)}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <div className="flex h-[25rem] w-[35rem] flex-col">
          <div className="flex justify-between border-b-4 border-black px-3 py-2 text-4xl font-extrabold">
            <input
              id="searchText"
              className="h-auto flex-1 placeholder-stone-300 focus-within:outline-none"
              placeholder="검색어를 입력해주세요."
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-20 w-20 hover:cursor-pointer"
              onClick={() => {
                setmodalIsOpen(false);
                applySearch(
                  (document.getElementById("searchText") as HTMLInputElement)
                    .value
                );
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <div className="flex-1" />
        </div>
      </Modal>
      <div className="mb-5 flex justify-between">
        <Link href={"/"}>
          <Image
            src={"https://www.creasmall.com/images/web/etc/etc-logo.svg"}
            alt={"로고"}
            width={37}
            height={40}
            className="hover:cursor-pointer"
          />
        </Link>
        <ul className="flex h-[0.9rem] items-center divide-x-2 text-[0.75rem] [&>li:last-child]:pr-0 [&>li>a]:hover:cursor-pointer [&>li]:flex [&>li]:justify-center [&>li]:px-[1rem]">
          <li>
            <a>로그인</a>
          </li>
          <li>
            <a>회원가입</a>
          </li>
          <li>
            <a>마이페이지</a>
          </li>
          <li>
            <a>찜목록</a>
          </li>
          <li className="items-center">
            <a className="flex space-x-1">
              <div>장바구니</div>
              <div className="flex h-[1.1rem] w-[1.1rem] items-center justify-center rounded-full bg-rose-500 text-white">
                0
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-between">
        <nav>
          <ul className="mb-5 flex space-x-10 text-3xl font-[900]">
            {["NEW ARRIVAL", "BEST", "BRAND", "LOOK BOOK"].map((el) => (
              <li
                className={`${
                  el === "LOOK BOOK" && "italic"
                } hover:cursor-pointer hover:underline ${roboto.className}`}
                key={el}
              >
                {el}
              </li>
            ))}
          </ul>
          <ul className="flex divide-x-2 text-lg">
            {Array.from(map_category.entries()).map(([key, value], idx) => (
              <li
                className={`flex justify-center px-8 text-slate-700 hover:cursor-pointer hover:font-extrabold hover:underline ${
                  idx === 0 && "pl-0"
                }`}
                key={key}
                onClick={() => applyCategory({ label: key, value })}
              >
                {key}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center">
          {search && (
            <div className="mr-3 flex items-center space-x-3 border-b-4 border-black p-4 text-4xl font-extrabold">
              <div className="mb-1">{search}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-10 w-10 text-red-600 hover:cursor-pointer"
                onClick={() => applySearch("")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-20 w-20 hover:cursor-pointer"
            onClick={() => setmodalIsOpen(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
